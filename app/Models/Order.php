<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = "orders";
    protected $fillable = ['user_id','total_cmd','date_cmd'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function itemsorder()
    {
        return $this->hasMany(ItemOrder::class, 'num_cmd', 'id');
    }
}