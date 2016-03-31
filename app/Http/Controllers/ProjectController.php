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
      $results = DB::select("INSERT INTO \"project\" (title, description, country, city, category, date_created, status, date_close, targetAmount) VALUES (:title, :description, :country, :city, :category, NOW(), 'ONGOING', :dateClose, :target) RETURNING id", [
          'title'        => $request->input('title'),
          'description'  => $request->input('description'),
          'country'      => $request->input('country'),
          'city'         => $request->input('city'),
          'category'     => $request->input('category'),
          'dateClose'    => $request->input('date_close'),
          'target'       => $request->input('targetAmount'),
      ]);
      return response()->json($results[0]);
    }

    /**
     * URL route for fetching a project
     * GET /api/project/{id}
     */
    public function show($project) {
      $results = DB::select("SELECT p.*, SUM(b.amount) as totalAmt, COUNT(b.*) as backers FROM \"project\" as p, \"project_backer\" AS b WHERE p.id = b.project AND p.id = :project AND status = 'ONGOING' GROUP BY p.id", [
          'project' => $project,
      ]);
      return response()->json($results[0]);
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
    public function delete(Request $request, $project) {
      DB::statement('BEGIN TRANSACTION');
      DB::update("UPDATE project SET status = 'REVOKED' WHERE id = :projectId", [
          'projectId'   => $project
      ]);
      $backers = DB::select("SELECT * FROM project_backer WHERE project = :project", ['project' => $project]);
      foreach($backer as $backers) {
        app('App\Http\Controllers\UserTransactionController')->store($request, $backer->member, 'Debit');
      }
      DB::statement('COMMIT');
      return response()->json($results);
    }
}
