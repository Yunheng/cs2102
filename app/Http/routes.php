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
    ['only' => ['index', 'store', 'destroy']]);

  Route::resource('project.backer', 'ProjectBackerController',
    ['only' => ['index', 'store', 'destroy']]);

  Route::resource('project.owner', 'ProjectOwnerController',
    ['only' => ['index', 'store', 'destroy']]);

  Route::resource('user', 'UserController',
    ['only' => ['store', 'show', 'update']]);

  Route::resource('user.transaction', 'UserTransactionController',
    ['only' => ['index']]);

  Route::resource('user.project', 'UserProjectController',
    ['only' => ['index']]);

  Route::resource('user.backing', 'UserBackingController',
    ['only' => ['index']]);

  Route::get('/users', 'UserController@users');

  Route::post('/user/login', 'UserController@login');
  Route::post('/user/password', 'UserController@changePassword');
});
