<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Order;
use Illuminate\Support\ServiceProvider;
use App\Models\User;
use App\Observers\CategoryObserver;
use App\Observers\OrderObserver;
use App\Observers\UserObserver;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        User::observe(UserObserver::class);
        Category::observe(CategoryObserver::class);
        Order::observe(OrderObserver::class);
    }
}