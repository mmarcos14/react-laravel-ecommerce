<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
protected $table="products";
protected $fillable = ['category_id','name','price','quantity','description','is_status','is_popular'];

    public function images()
    {
        return $this->hasMany(ImageProduct::class, 'product_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
