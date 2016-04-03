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
}
