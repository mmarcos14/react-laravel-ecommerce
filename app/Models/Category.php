<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table="categories";
    protected $fillable = ['name','description','photo','is_status','is_popular'];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
