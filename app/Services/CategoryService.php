<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function getAll()
    {
        return Category::orderBy('id', 'DESC')
            ->with('products')
            ->get();
    }

   public function create(array $data, $request)
{
    $file_name = $this->uploadImage('uploads/categories', $request);

    return Category::create([
        'name' => $data['name'],
        'description' => $data['description'],
        'is_status' => (int) $request->input("is_status", "0"),
        'is_popular' => (int) $request->input("is_popular", "0"),
        'photo' => $file_name
    ]);
}

  public function uploadImage($path, $request)
{
    if (!$request->hasFile('photo')) {
        return null;
    }

    $file = $request->file('photo');

    $file_name = time() . '-' . $file->getClientOriginalName();

    $file->move(public_path($path), $file_name);

    return $file_name;
}

    public function update($request)
    {
        $category = Category::find($request->id);

        if (!$category) {
            return null;
        }

        $file_name = $category->photo;

        if ($request->hasFile('photo')) {

            // delete old image
            if ($category->photo && file_exists(public_path('uploads/categories/' . $category->photo))) {
                unlink(public_path('uploads/categories/' . $category->photo));
            }

          $file_name=$this->uploadImage('uploads/categories',$request);
        }

        $category->update([
            'name' => $request->name,
            'description' => $request->description,
            'is_status' => (int) $request->input("is_status", "0"),
            'is_popular' => (int) $request->input("is_popular", "0"),
            'photo' => $file_name
        ]);

        return $category;
    }
}