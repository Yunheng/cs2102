<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class UserController extends Controller
{
    /**
     * URL route for creating a new user
     * POST /api/user
     */
    public function store(Request $request) {
      $results = DB::insert("INSERT INTO \"user\" (username, password, registered_date, address, avatar, email) VALUES (:username, :password, NOW(), :address, :avatar, :email)", [
          'username'  => $request->input('username'),
          'password'  => $request->input('password'),
          'address'   => $request->input('address'),
          'avatar'    => $request->input('avatar'),
          'email'     => $request->input('email'),
      ]);
      return response()->json($results);
    }

    /**
     * URL route for fetching a user
     * GET /api/user/{username}
     */
    public function show($user) {
      $results = DB::select("SELECT username, registered_date, address, avatar, email FROM \"user\" WHERE username = :username", [
          'username' => $user,
      ]);
      return response()->json($results);
    }

    /**
     * URL route for updating an existing user
     * PUT /api/user/{username}
     */
    public function update(Request $request, $user) {
      $results = DB::update("UPDATE \"user\" SET address = :address, email = :email WHERE username = :username", [
          'address'   => $request->input('address'),
          'email'     => $request->input('email'),
          'username'  => $user
      ]);
      return response()->json($results);
    }

    /**
     * URL route for logging in a user
     * POST /api/user/login
     */
    public function login(Request $request) {
      $results = DB::select("SELECT username, registered_date, address, avatar, email FROM \"user\" WHERE username = :username AND password = :password", [
          'username' => $request->input('username'),
          'password' => $request->input('password')
      ]);

      // check if we actually have a user found
      if (count($results) > 0) {
        DB::update("UPDATE \"user\" SET last_login = NOW() WHERE username = :username", [
          'username' => $request->input('username')
        ]);
      }
      return response()->json($results);
    }

    /**
     * URL route for changing user password
     * POST /api/user/password
     */
    public function changePassword(Request $request) {
      $results = DB::update("UPDATE \"user\" SET password = :password WHERE username = :username AND password = :oldPassword", [
          'password'     => $request->input('password'),
          'oldPassword'  => $request->input('oldPassword'),
          'username'     => $request->input('username'),
      ]);
      return response()->json($results);
    }
}
