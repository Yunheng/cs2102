<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class UserTransactionController extends Controller
{
    /**
     * URL route for fetching a user's transactions
     * GET /api/user/{userId}/transaction
     */
    public function index($user) {
      $results = DB::select("SELECT * FROM \"transaction\" WHERE transaction.user = :username", [
        'username' => $user
      ]);
      return response()->json($results);
    }

    /**
     * URL route for creating a new transaction for a user
     * POST /api/user/{userId}/transaction
     */
    public function store(Request $request, $user, $type = 'Credit') {
      DB::statement('BEGIN TRANSACTION');
      $results = DB::select("INSERT INTO \"transaction\" (code, type, \"user\") VALUES (random_string(12), :type, :user) RETURNING code", [
        'type'  => $type,
        'user' => $user
      ]);
      if ($type == 'Credit') {
        app('App\Http\Controllers\ReceiptController')->store($request, $results[0]->code);
      }
      DB::statement('COMMIT');
      return response()->json($results[0]);
    }
}
