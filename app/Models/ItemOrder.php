<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemOrder extends Model
{
    protected $table = "item_orders";
    protected $fillable = ['num_cmd','product_id','quantity','price','total'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'num_cmd', 'id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}

