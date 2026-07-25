<?php

namespace App\Services;

class CartService
{
    public function TotalCart(array $data): float
    {
        $total = 0;

        foreach ($data as $item) {

            $total += (int) $item['qt'] * (float) $item['product_price'];
        }

        return (float) $total;
    }
}