<?php

namespace App\Http\Controllers;

use App\Models\ImageProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $products = Product::orderBy('id', 'DESC')
    ->with(['images','category'])
    ->get();
     return response()->json(['nproducts'=> $products]);
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'price' => 'required',
        'quantity' => 'required',
        'description' => 'required',
        'category_id' => 'required',
        'photos' => 'required',
        'is_popular' => 'nullable',
        'is_status' => 'nullable',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    $data = $validator->validated();

    // SAFE BOOLEAN CONVERSION (IMPORTANT FIX)
    $isPopular = (int) $request->input('is_popular', 0);
    $isStatus  = (int) $request->input('is_status', 0);

    // CREATE PRODUCT
    $product = Product::create([
        'category_id' => $data['category_id'],
        'name' => $data['name'],
        'price' => $data['price'],
        'quantity' => $data['quantity'],
        'description' => $data['description'],
        'is_popular' => $isPopular,
        'is_status' => $isStatus,
    ]);

    // UPLOAD IMAGES
    $path = "uploads/products";

    if ($request->hasFile('photos')) {
        foreach ($request->file('photos') as $file) {

            $file_name = time() . '-' . $file->getClientOriginalName();

            $file->move(public_path($path), $file_name);

            ImageProduct::create([
                'name' => $file_name,
                'path' => $path,
                'product_id' => $product->id
            ]);
        }
    }

    return response()->json([
        'message' => 'Product created successfully',
        'data' => $product
    ], 200);
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
        'category_id' => 'required',
        'name' => 'required',
        'price' => 'required',
        'quantity' => 'required',
        'description' => 'required',
        'photos' => 'nullable'
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $data = $validator->validate();

    $product = Product::find($request->id);

    $product->update([
        'category_id' => $data['category_id'],
        'name' => $data['name'],
        'price' => $data['price'],
         'quantity' => $data['quantity'],
        'description' => $data['description']
    ]);

    $path = "uploads/products";

    /*  SUPPRESSION ANCIENNES IMAGES */
    if ($request->hasFile('photos')) {

        // 1. supprimer fichiers physiques + DB
        foreach ($product->images as $img) {

            $oldPath = public_path($path . '/' . $img->name);

            if (file_exists($oldPath)) {
                unlink($oldPath);
            }

            $img->delete();
        }

        // 2. ajouter nouvelles images
        foreach ($request->file('photos') as $file) {
            $file_name = time() . '-' . $file->getClientOriginalName();

            $file->move(public_path($path), $file_name);

            ImageProduct::create([
                'product_id' => $product->id,
                'name' => $file_name,
                'path' => $path
            ]);
        }
    }

    return response()->json([
        'message' => 'Product updated successfully',
        'data' => $product->load('images')
    ], 200);
}

    /**
     * Remove the specified resource from storage.
     */
public function destroy(string $id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json([
            'message' => 'Product not found'
        ], 404);
    }

    $path = 'uploads/products';

    // supprimer images physiques + DB
    foreach ($product->images as $image) {

        $filePath = public_path($path . '/' . $image->name);

        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $image->delete();
    }

    // supprimer le produit
    $product->delete();

    return response()->json([
        'message' => 'Product deleted successfully'
    ], 200);
}
}
