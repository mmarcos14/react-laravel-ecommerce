<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories=Category::Orderby('id','DESC')->with('products')->get();
        return response()->json(['categoriesdata'=>$categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'description' => 'required',
        'photo' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    $data = $validator->validated();

    $file_name = null;

    if ($request->hasFile('photo')) {
        $file = $request->file('photo');

        $file_name = time() . '_' . $file->getClientOriginalName();

        $file->move(public_path('uploads/categories'), $file_name);
    }

    $category = Category::create([
        'name' => $data['name'],
        'description' => $data['description'],
        'photo' => $file_name
    ]);

    return response()->json([
        'message' => 'Category created successfully',
        'data' => $category
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
  public function update(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'description' => 'required',
        'photo' => 'nullable|image'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    $data = $validator->validated();

    $category = Category::find($request->id);

    if (!$category) {
        return response()->json(['message' => 'Not found'], 404);
    }

    $file_name = $category->photo;

    if ($request->hasFile('photo')) {

        //  delete old image
        if ($category->photo && file_exists(public_path('uploads/categories/' . $category->photo))) {
            unlink(public_path('uploads/categories/' . $category->photo));
        }

        //  upload new image
        $file = $request->file('photo');
        $file_name = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('uploads/categories'), $file_name);
    }

    $category->update([
        'name' => $data['name'],
        'description' => $data['description'],
        'photo' => $file_name
    ]);

    return response()->json([
        'message' => 'Category updated successfully',
        'data' => $category
    ], 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
