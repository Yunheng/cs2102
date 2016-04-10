<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class ProjectOwnerController extends Controller
{
    /**
     * URL route for fetching a project's owners
     * GET /api/project/{projectId}/owner
     */
    public function index($project) {
      $results = DB::select("SELECT u.username as member, o.project, u.last_login, u.address, u.registered_date, u.email FROM \"project_owner\" AS o, \"user\" AS u WHERE u.username = o.member AND o.project = :project", [
        'project' => $project
      ]);
      return response()->json($results);
    }

    /**
     * URL route for adding a new owner to the project
     * POST /api/project/{projectId}/owner
     */
    public function store(Request $request, $project) {
      $results = DB::insert("INSERT INTO \"project_owner\" (role, member, project) VALUES (:role, :user, :project)", [
        'role'  => $request->input('role'),
        'user' => $request->input('user'),
        'project' => $project
      ]);
      return response()->json($results);
    }

    /**
     * URL route for deleting an existing project owner
     * DELETE /api/project/{projectId}/owner/{ownerId}
     */
    public function delete($project, $owner) {
      $results = DB::delete("DELETE FROM \"project_owner\" WHERE member = :user AND project = :project", [
          'member'   => $owner,
          'project'  => $project
      ]);
      return response()->json($results);
    }
}
