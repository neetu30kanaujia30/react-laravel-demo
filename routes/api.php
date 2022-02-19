<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

#Auth
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'Api\Auth\AuthController@login');
    Route::post('signup', 'Api\Auth\AuthController@signup');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'Api\Auth\AuthController@logout');
        Route::get('me', 'Api\Auth\AuthController@me');
        Route::post('confirm-email', 'Api\Auth\AuthController@confirmEmail');
    });    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'Api\Auth\AuthController@logout');
        Route::get('me', 'Api\Auth\AuthController@me');
    });
});
Route::get('get-users', 'Api\UserController@getUsers');
Route::post('/profile/save-avatar', 'Api\UserController@saveAvatar');
Route::delete('/profile/remove-avatar', 'Api\UserController@removeAvatar');
Route::post('/get-profile', 'Api\UserController@getProfile');
Route::post('/edit-profile', 'Api\UserController@editProfile');

