<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function create(Request $request) {
      $results = DB::insert("INSERT INTO \"user\" (username, password, registered_date, address, avatar, email) VALUES (:username, :password, NOW(), :address, :avatar, :email)", [
          'username'  => $request->input('username'),
          'password'  => $request->input('password'),
          'address'   => $request->input('address'),
          'avatar'    => $request->input('avatar'),
          'email'     => $request->input('email'),
      ]);
      return response()->json($results);
    }

    public function show($user) {
      $results = DB::select("SELECT * FROM \"user\" WHERE username = :username", [
          'username' => $user,
      ]);
      return response()->json($results);
    }

    public function update(Request $request, $user) {
      $results = DB::update("UPDATE \"user\" SET address = :address, avatar = :avatar, email = :email WHERE username = :username", [
          'address'   => $request->input('address'),
          'avatar'    => $request->input('avatar'),
          'email'     => $request->input('email'),
          'username'  => $user
      ]);
      return response()->json($results);
    }

    public function login(Request $request) {
      $results = DB::select("SELECT * FROM \"user\" WHERE username = :username AND password = :password", [
          'username' => $request->input('username'),
          'password' => $request->input('password')
      ]);
      return response()->json($results);
    }

    public function changePassword(Request $request) {
      $results = DB::update("UPDATE \"user\" SET password = :password WHERE username = :username AND password = :oldPassword", [
          'password'     => $request->input('password'),
          'oldPassword'  => $request->input('oldPassword'),
          'username'     => $request->input('username'),
      ]);
      return response()->json($results);
    }
}
