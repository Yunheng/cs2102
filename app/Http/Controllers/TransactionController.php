<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class TransactionController extends Controller
{
  /**
   * URL route for creating a new user
   * POST /api/transaction
   */
  public function store(Request $request) {
    $results = DB::select("INSERT INTO \"transaction\" (code, type, amount, \"user\") VALUES (random_string(12), :type, :amount, :user) RETURNING code", [
      'type'  => 'Credit',
      'amount' => $request->input('amount'),
      'user' => $request->input('user')
    ]);
    app('App\Http\Controllers\ReceiptController')->store($request, $results[0]->code);
    return response()->json($results[0]);
  }

}
