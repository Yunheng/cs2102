<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use ReceiptController;

class TransactionController extends Controller
{
  public function store(Request $request) {
    DB::statement('BEGIN TRANSACTION;');
    $results = DB::insert("INSERT INTO \"transaction\" (code, type, \"user\") VALUES (random_string(12), :type, :user) RETURNING code", [
      'type'  => 'Credit',
      'user' => $request->input('user')
    ]);
    ReceiptController::store($request);
    DB::statement('ROLLBACK;');
    return response()->json($results);
  }
}
