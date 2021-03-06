<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class ProjectBackerController extends Controller
{
    /**
     * URL route for fetching a project's backers
     * GET /api/project/{projectId}/backer
     */
    public function index($project) {
      $results = DB::select("SELECT b.*, u.username, u.last_login, u.address, u.registered_date, u.email FROM \"project_backer\" AS b, \"user\" AS u WHERE u.username = b.member AND b.project = :project ORDER BY amount DESC", [
        'project' => $project
      ]);
      return response()->json($results);
    }

    /**
     * URL route for create a new comment on the project
     * POST /api/project/{projectId}/backer
     */
    public function store(Request $request, $project) {
      DB::statement('BEGIN TRANSACTION');
      DB::insert("INSERT INTO \"project_backer\" (member, project, amount) VALUES (:user, :project, :amt)", [
        'amt'  => $request->input('amount'),
        'user' => $request->input('user'),
        'project' => $project
      ]);
      $result = app('App\Http\Controllers\TransactionController')->store($request);
      DB::statement('COMMIT');
      return response()->json($result);
    }

    /**
     * URL route for deleting an existing project backer
     * DELETE /api/project/{project}/backer/{userId}
     */
    public function delete($project, $user) {
      $results = DB::delete("DELETE FROM \"project_backer\" WHERE b.project = :project AND b.member = :user", [
          'project'   => $project,
          'user'      => $user
      ]);
      return response()->json($results);
    }
}
