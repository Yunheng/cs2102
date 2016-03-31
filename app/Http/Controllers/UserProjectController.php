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
      $results = DB::select("SELECT p.*, SUM(b.amount) as totalAmt, COUNT(b.*) as backers FROM \"project\" AS p, \"project_owner\" AS o, \"project_backer\" as b  WHERE p.id = b.project AND p.id = o.project AND o.member = :username AND (p.status = 'ONGOING' OR p.status = 'COMPLETE') GROUP BY p.id ORDER BY p.date_created DESC", [
        'username' => $user
      ]);
      return response()->json($results);
    }

}
