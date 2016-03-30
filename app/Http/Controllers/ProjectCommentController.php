<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

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
}
