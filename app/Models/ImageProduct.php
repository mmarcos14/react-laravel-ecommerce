<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageProduct extends Model
{
 
 protected $table="image_products";
 protected $fillable = ['name','path','product_id'];

 public function product(){
    return $this->belongsTo(Product::class);
 }
}
