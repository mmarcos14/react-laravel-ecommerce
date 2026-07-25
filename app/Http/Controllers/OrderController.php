<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\CartService;
use App\Services\OrderService;
use App\Services\ProductService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    protected $cartService;
    protected $productService;
    protected $orderService;
    protected $userService;

    public function __construct(
        CartService $cartService,
        ProductService $productService,
        OrderService $orderService,
        UserService $userService
    ) {
        $this->cartService = $cartService;
        $this->productService = $productService;
        $this->orderService = $orderService;
        $this->userService = $userService;
    }

    public function store(Request $request)
    {
        //  validation minimale checkout
        $validator = Validator::make($request->all(), [
            'products' => 'required|array',
            'form.email' => 'required|email',
            'form.password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }

        //  1. USER LOGIC (create or use existing)
        if (!Auth::check()) {

           $user= $this->userService->register($request->form);
           Auth::login($user);

        } else {

            $user = Auth::user();
        }

        // sécurité
        if (!$user) {
            return response()->json([
                'status' => 401,
                'message' => 'User not authenticated'
            ], 401);
        }

        //  2. TOTAL CART
        $total = $this->orderService->TotalCart($request->products);

        //  3. CREATE ORDER
        $order = $this->orderService->storeOrder(
            $total,
            $user
        );

        //  4. ADDRESS
        $this->userService->AddAdress($request->form);

        // 5. ORDER ITEMS
        $this->orderService->itemorder(
            $request->products,
            $order
        );

        return response()->json([
            'status' => 200,
            'order' => $order
        ]);
    }

    public function index()
    {
        $data=Order::where('user_id',Auth::id())->with(['user.adresse','itemsorder.product'])->latest()->get();
        return response()->json([
            'dataorder' => $data
        ]);
    }
}

