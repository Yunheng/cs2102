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
      $results = DB::select("SELECT * FROM \"project_comment\" WHERE project_comment.project = :project", [
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
}
