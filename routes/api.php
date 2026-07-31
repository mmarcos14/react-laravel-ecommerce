<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->group(function(){
Route::get('/user/index',[UserController::class,'getUser']);
});

Route::post('/user/store',[UserController::class,'store']);
Route::post('/user/login',[UserController::class,'login']);
Route::post('/user/logout',[UserController::class,'removeuserconnexion']);


Route::get('/category/index',[CategoryController::class,'index']);
Route::post('/category/store',[CategoryController::class,'store']);
Route::post('/category/update',[CategoryController::class,'update']);

Route::post('/product/store',[ProductController::class,'store']);
Route::post('/product/update',[ProductController::class,'update']);
Route::get('/product/details/{id}',[ProductController::class,'details']);


Route::get('/product/index',[ProductController::class,'index']);
Route::delete('/product/delete/{id}',[ProductController::class,'destroy']);
//delete product image
Route::delete('/image/delete/{id}',[ProductController::class,'destroyImage']);



Route::post('/order/store',[OrderController::class,'store']);
Route::post('/payment/store',[OrderController::class,'createPaymentIntent']);
Route::get('/order/index',[OrderController::class,'index']);











