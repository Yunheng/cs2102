<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ReceiptController extends Controller
{
  public function store(Request $request, $transaction) {
    $results = DB::insert("INSERT INTO \"Receipt\" (receiptNo, address, amount, transaction) VALUES (random_string(12), :address, :amount, :transaction)", [
      'address'  => $request->input('address'),
      'amount' => $request->input('amount'),
      'transaction' => $transaction
    ]);
    return response()->json($results);
  }
}
