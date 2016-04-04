<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class ProjectCommentController extends Controller
{
    /**
     * URL route for fetching a project's comments
     * GET /api/project/{projectId}/comment
     */
    public function index($project) {
      $results = DB::select("SELECT c.*, u.username, u.last_login, u.address, u.registered_date, u.email FROM \"project_comment\" AS c, \"user\" AS u WHERE u.username = c.member AND c.project = :project ORDER BY posted DESC", [
        'project' => $project
      ]);
      return response()->json($results);
    }

    /**
     * URL route for create a new comment on the project
     * POST /api/project/{projectId}/comment
     */
    public function store(Request $request, $project) {
      $results = DB::insert("INSERT INTO \"project_comment\" (content, posted, member, project, parent) VALUES (:content, NOW(), :user, :project, NULL)", [
        'content'  => $request->input('content'),
        'user' => $request->input('user'),
        'project' => $project
      ]);
      return response()->json($results);
    }

    /**
     * URL route for deleting an existing project comment
     * DELETE /api/project/{project}/comment/{commentId}
     */
    public function delete($project, $comment) {
      $results = DB::delete("DELETE FROM \"project_comment\" WHERE id = :commentId", [
          'commentId'   => $comment
      ]);
      return response()->json($results);
    }
}
