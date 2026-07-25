<?php

namespace App\Observers;

use App\Models\Order;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function creating(Order $order): void
    {
        $last=Order::latest()->first();
        if($last && !empty($last->num_cmd)){
            $code=str_replace("CM","",$last->num_cmd);
            $increase=$code+1;
            $string=str_pad($increase,6,"0",STR_PAD_LEFT);
            $order->num_cmd="CM".$string;
        }else{
            $order->num_cmd="CM000001";
        }
    }

    public function creatingC(Order $order): void
{
    $last = Order::orderBy('id', 'desc')->first();

    if ($last && !empty($last->num_cmd)) {

        $code = (int) str_replace("CM", "", $last->num_cmd);
        $increase = $code + 1;

        $string = str_pad($increase, 6, "0", STR_PAD_LEFT);

        $order->num_cmd = "CM" . $string;

    } else {

        $order->num_cmd = "CM000001";
    }
}

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
