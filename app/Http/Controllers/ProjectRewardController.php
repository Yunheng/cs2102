<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class ProjectRewardController extends Controller
{
    /**
     * URL route for fetching a project's rewards
     * GET /api/project/{projectId}/reward
     */
    public function index($project) {
      $results = DB::select("SELECT * FROM \"project_reward\" as r WHERE r.project = :project ORDER BY minAmount ASC", [
        'project' => $project
      ]);
      return response()->json($results);
    }

    /**
     * URL route for adding a new reward to the project
     * POST /api/project/{projectId}/reward
     */
    public function store(Request $request, $project) {
      $results = DB::insert("INSERT INTO \"project_reward\" (name, project, description, maxbackers, minamount) VALUES (:name, :project, :desc, :backers, :amount)", [
        'name'  => $request->input('name'),
        'project' => $project,
        'desc' => $request->input('description'),
        'backers' => $request->input('maxBackers'),
        'amount' => $request->input('minAmount')
      ]);
      return response()->json($results);
    }

    /**
     * URL route for deleting an existing project reward
     * DELETE /api/project/{projectId}/reward/{rewardNameInBase64Encode}
     *
     * Send the name of the project in base 64 encoded
     */
    public function delete($project, $reward) {
      $results = DB::delete("DELETE FROM \"project_reward\" WHERE name = :name AND project = :project", [
          'name'   => base64_decode($reward),
          'project'  => $project
      ]);
      return response()->json($results);
    }
}
