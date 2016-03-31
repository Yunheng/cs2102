<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class ProjectController extends Controller
{
    /**
     * URL route for creating a new project
     * POST /api/project
     */
    public function store(Request $request) {
      $results = DB::select("INSERT INTO \"project\" (title, description, country, city, category, date_created, status) VALUES (:title, :description, :country, :city, :category, NOW(), 'ONGOING') RETURNING id", [
          'title'        => $request->input('title'),
          'description'  => $request->input('description'),
          'country'      => $request->input('country'),
          'city'         => $request->input('city'),
          'category'     => $request->input('category'),
      ]);
      return response()->json($results[0]);
    }

    /**
     * URL route for fetching a project
     * GET /api/project/{id}
     */
    public function show($project) {
      $results = DB::select("SELECT * FROM \"project\" WHERE id = :project AND status = 'ONGOING'", [
          'project' => $project,
      ]);
      return response()->json($results);
    }

    /**
     * URL route for fetching all projects
     * GET /api/project
     */
    public function index() {
      $results = DB::select("SELECT p.*, SUM(b.amount) as totalAmt, COUNT(b.*) as backers FROM \"project\" AS p, \"project_backer\" AS b WHERE p.id = b.project AND status = 'ONGOING' GROUP BY p.id ORDER BY p.date_created DESC");
      return response()->json($results);
    }

    /**
     * URL route for deleting an existing project
     * DELETE /api/project/{project}
     */
    public function delete($project) {
      $results = DB::delete("DELETE FROM project WHERE id = :projectId", [
          'projectId'   => $project
      ]);
      return response()->json($results);
    }
}
