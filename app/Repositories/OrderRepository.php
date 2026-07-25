<?php
namespace App\Repositories;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderRepository{
    public function findById($id){
        return Order::find($id);
    }

    public function getOrders(){
        $data=Order::where('user_id',Auth::id())->with(['itemsorder.product'])->latest()->get();
        return response()->json(['status'=>200,'dataorder'=>$data->load('')]);
    }

}