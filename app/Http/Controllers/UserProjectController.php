<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class UserProjectController extends Controller
{
    /**
     * URL route for fetching a user's projects
     * GET /api/user/{userId}/project
     */
    public function index($user) {
      $results = DB::select("SELECT p.*, SUM(b.amount) as totalAmt, COUNT(b.*) as backers FROM project as p LEFT JOIN project_backer as b ON p.id = b.project LEFT JOIN project_owner as o ON o.project = p.id WHERE o.member = :username AND (status = 'ONGOING' OR status = 'COMPLETE') GROUP BY p.id ORDER BY p.date_created DESC", [
        'username' => $user
      ]);
      return response()->json($results);
    }

}
