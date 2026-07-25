<?php
namespace App\Services;

use App\Models\ItemOrder;
use App\Models\Order;
use App\Models\User;

use Illuminate\Support\Facades\Auth;

class OrderService
{
    public function storeOrder(float $total,User $user)
    {
        return Order::create([
            'total_cmd' => $total,
            'date_cmd' => date('Y-m-d'),
            'user_id' => $user->id
        ]);
    }


  public function itemorder(array $data, Order $order): void
{
    foreach ($data as $item) {

        $lineTotal = $item['product_price'] * $item['qt'];

        ItemOrder::create([
            'num_cmd' => $order->id,
            'product_id' => $item['product_id'],
            'price' => $item['product_price'],
            'quantity' => $item['qt'],
            'total' => $lineTotal
        ]);
    }
}

public function getOrder()
{
    $orders = Order::where('user_id', Auth::id())
        ->with(['itemsorder.product'])
        ->latest()
        ->get();

    return $orders;
}

}

//id	num_cmd	product_id	quantity	price	total	created_at	updated_at