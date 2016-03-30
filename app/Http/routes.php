<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});

Route::group(['prefix' => 'api'], function () {
  Route::resource('project', 'ProjectController',
    ['only' => ['index', 'store', 'show', 'update', 'destroy']]);

  Route::resource('project.comment', 'ProjectCommentController',
    ['only' => ['index', 'store']]);

  Route::resource('user', 'UserController',
    ['only' => ['store', 'show', 'update']]);

  Route::resource('transaction', 'TransactionController',
    ['only' => ['store']]);

  Route::resource('user.project', 'UserProjectController',
    ['only' => ['index']]);

  Route::post('/user/login', 'UserController@login');
  Route::post('/user/password', 'UserController@changePassword');
  Route::get('/users', 'UserController@users');
});
