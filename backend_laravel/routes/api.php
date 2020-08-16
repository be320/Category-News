<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('/categories','CategoryController');
Route::apiResource('/news','NewsController');
Route::get('/categories/{name}/family', 'CategoryController@showFamily');
Route::get('/categories/{name}/news', 'CategoryController@showNews');