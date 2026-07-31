<?php
namespace App\Repositories;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderRepository{
    public function findById($id){
        return Order::find($id);
    }

    public function getOrders(){
        $data=Order::where('user_id',Auth::id())->with(['user.adresse','itemsorder.product'])->latest()->get();
        return response()->json([
            'dataorder' => $data
        ]);
    }

}