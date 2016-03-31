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
      $results = DB::select("SELECT * FROM \"project\", \"project_owner\" WHERE project.id = project_owner.project AND project_owner.member = :username AND (project.status = 'ONGOING' OR project.status = 'COMPLETE')", [
        'username' => $user
      ]);
      return response()->json($results);
    }

}
