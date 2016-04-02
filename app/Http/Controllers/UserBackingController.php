<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class UserBackingController extends Controller
{
    /**
     * URL route for fetching all projects backed by a user
     * GET /api/user/{userId}/backing
     */
    public function index($user) {
      $results = DB::select("SELECT p.* FROM project_backer as b, project as p WHERE b.project = p.id AND b.member = :username ORDER BY p.date_created DESC", [
        'username' => $user
      ]);
      return response()->json($results);
    }
}
