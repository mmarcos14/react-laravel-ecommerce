<?php

namespace App\Http\Controllers;

use App\Models\ImageProduct;
use App\Models\Product;
use App\Repositories\ProductRepository;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
   protected $productService, $productRepository;

    public function __construct(ProductService $productservices,ProductRepository $productRepository)
    {
        $this->productService=$productservices;
        $this->productRepository=$productRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    $products= $this->productService->getAll();
      return response(['nproducts'=>$products]);
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
    $product=$this->productService->create($validator->validate(),$request);
  

  

}

    /**
     * Display the specified resource.
     */
    public function details(int $id)
    {
        $product=Product::find($id);
        return response()->json(['prod'=>$product->load('images')]);
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

      $product=$this->productService->update($request);
      return response()->json([
        'message' => 'Product updated successfully',
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

public function destroyImage(Request $request,$id){
 $this->productRepository->findImageById($id);
}
}
