<?php
namespace App\Repositories;

use App\Models\Order;

class OrderRepository{
    public function findById($id){
        return Order::find($id);
    }

}