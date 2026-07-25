<?php

namespace App\Services;

use App\Models\ImageProduct;
use App\Models\Product;
use App\Repositories\ProductRepository;

class ProductService{
    protected $productrepository;

public function __construct(ProductRepository $productrepository)
{
  $this->productrepository=$productrepository; 
}

 //get product
 public function getAll(){
    return Product::orderby('id','DESC')->with(['images','category'])->get();
   
 }




public function create(array $data, $request)
{
      $product=$this->productrepository->createProduct(
         [
        'category_id' => $data['category_id'],
        'name'=> $data['name'],
        'price'=> $data['price'],
        'description' => $data['description'],
        'photo'=> $this->uploadImage($request,"uploads/products"),
        'is_status'=> (int) $request->input('is_status', 0),
        'is_popular'=> (int) $request->input('is_popular', 0),
    ]
    );  

      if ($request->hasFile('photos')) {
       $this->storeImageMultiple($product, $request);
    }
      return response()->json([
        'message' => 'Product created successfully',
        'data' => $product->load('images', 'category')
     ], 201);
}


public function update($request)
{
    $product = $this->productrepository->findById($request->id);

    if (!$product) {
        return null;
    }

    $this->productrepository->updateProduct(
        [
            'category_id' => $request->category_id,
            'name'        => $request->name,
            'price'       => $request->price,
            'description' => $request->description,
            'is_status'   => (int) $request->input("is_status", "0"),
            'is_popular'  => (int) $request->input("is_popular", "0"),
        ],
        $product
    );

    if ($request->hasFile('photos')) {
        $this->deleteOldImages($product);
        $this->storeImageMultiple($product, $request);
    }

    return $product->fresh(['images', 'category']);
}


public function uploadImage($request, $path = "uploads/products")
{
    if (!$request->hasFile('photos')) {
        return null;
    }

    $files = $request->file('photos');

    // Première image
    $file = is_array($files) ? $files[0] : $files;

    $fileName = time() . '-' . $file->getClientOriginalName();

    // Déplacement dans public/uploads/products

    return $fileName;
}

 public function storeImageMultiple(Product $product,$request){
     $path="uploads/products";
        if($request->hasFile('photos')){
            foreach($request->file("photos") as $file){
                $file_name=time().'-'.$file->getClientOriginalName();
                $file->move(public_path($path),$file_name);
                ImageProduct::create(['product_id'=>$product->id,'name'=>$file_name,'path'=>$path]);

            }
        }
 }

 public function deleteOldImages(Product $product)
{
    foreach ($product->images as $img) {

        $path = public_path($img->path . '/' . $img->name);

        // supprimer fichier physique
        if (file_exists($path)) {
            unlink($path);
        }

        // supprimer ligne DB
        $img->delete();
    }
}



}