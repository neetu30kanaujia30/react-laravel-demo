<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\IndexController;
use Illuminate\Support\Facades\Route;

Route::any('{all}', [IndexController::class,'__invoke'])->where('all', '.*');
