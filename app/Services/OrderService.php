<?php

namespace App\Services;

use App\Models\ItemOrder;
use App\Models\Order;
use App\Models\User;
use App\Repositories\OrderRepository;
use Illuminate\Support\Facades\Auth;

class OrderService
{
    protected $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository=$orderRepository;
    }
    public function TotalCart(array $data): float
    {
        $total = 0;

        foreach ($data as $item) {
            $total += (int) $item['qt'] * (float) $item['product_price'];
        }

        return (float) $total;
    }

    public function storeOrder(float $total, User $user)
    {
        return Order::create([
            'total_cmd' => $total,
            'date_cmd'  => date('Y-m-d'),
            'user_id'   => $user->id,
        ]);
    }

    public function itemorder(array $data, Order $order): void
    {
        foreach ($data as $item) {

            $lineTotal = $item['product_price'] * $item['qt'];

            ItemOrder::create([
                'num_cmd'    => $order->id,
                'product_id' => $item['product_id'],
                'price'      => $item['product_price'],
                'quantity'   => $item['qt'],
                'total'      => $lineTotal,
            ]);
        }
    }

    public function getOrder()
    {
        $this->orderRepository->getOrders();
    }
}