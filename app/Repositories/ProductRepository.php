<?php

namespace App\Repositories;

use App\Models\ImageProduct;
use App\Models\Product;

class ProductRepository{

    public function createProduct(array $data){
        return Product::create($data);
    }

    public function updateProduct(array $data,Product $product){
        return $product->update($data);
    }

    public function findById($id){
        return Product::find($id);
    }

    public function getWithImage(){
        return Product::with('images')->get();
    }

 public function findImageById($id)
{
    $image = ImageProduct::find($id);

    if (!$image) {
        return response()->json([
            'message' => 'Image not found'
        ], 404);
    }

    $product = $image->product;

    $image->delete();

    return response()->json([
        'status' => 200,
        'product' => $product->fresh('images')
    ]);
}

}