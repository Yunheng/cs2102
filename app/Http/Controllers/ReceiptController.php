<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class ReceiptController extends Controller
{
  public function store(Request $request, $transaction) {
    $results = DB::select("INSERT INTO \"receipt\" (receiptNo, address, amount, transaction) VALUES (random_string(12), :address, :amount, :transaction) RETURNING receiptNo", [
      'address'  => $request->input('address'),
      'amount' => $request->input('amount'),
      'transaction' => $transaction
    ]);
    return $results[0]->receiptNo;
  }
}
