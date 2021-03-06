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
      $results = DB::select("SELECT p.*, SUM(b.amount) as totalAmt, COUNT(b.*) as backers FROM project as p LEFT JOIN project_backer as b ON p.id = b.project WHERE p.id = :project AND (status = 'ONGOING' OR status = 'COMPLETE') GROUP BY p.id", [
          'project' => $project,
      ]);
      if (count($results) == 1) {
        return response()->json($results[0]);
      } else {
        return response()->json([]);
      }
    }

  /**
   * URL route for updating an existing user
   * PUT /api/user/{username}
   */
  public function update(Request $request, $project) {
    $results = DB::update("UPDATE \"project\" SET title = :title, description = :description, country = :country, city = :city, category = :category  WHERE id = :id", [
        'title'        => $request->input('title'),
        'description'  => $request->input('description'),
        'country'      => $request->input('country'),
        'city'         => $request->input('city'),
        'category'     => $request->input('category'),
        'id'  => $project
    ]);
    return response()->json($results);
  }

    /**
     * URL route for fetching all projects
     * GET /api/project
     */
    public function index(Request $request) {
      $view = 'default';
      if ($request->has('view')) {
        $view = $request->input('view');
      }

      switch($view) {
        case 'popular':
          $results = DB::select("SELECT p.*, SUM(b.amount) AS totalAmt, COUNT(b.*) AS backers, SUM(b.amount)/COUNT(b.*) AS AmtPerBacker FROM project AS p LEFT JOIN project_backer AS b ON p.id = b.project WHERE (p.status = 'ONGOING') GROUP BY p.id ORDER BY backers DESC, AmtPerBacker DESC");
          break;
        case 'newest':
          $results = DB::select("SELECT p.*, SUM(b.amount) AS totalAmt, COUNT(b.*) AS backers FROM project AS p LEFT JOIN project_backer AS b ON p.id = b.project WHERE (p.status = 'ONGOING') GROUP BY p.id ORDER BY p.date_created DESC");
          break;
        case 'search':
          $results = DB::select("SELECT p.*, SUM(b.amount) AS totalAmt, COUNT(b.*) AS backers FROM project AS p LEFT JOIN project_backer AS b ON p.id = b.project WHERE (p.status = 'ONGOING' AND p.title LIKE :search) GROUP BY p.id ORDER BY p.date_close ASC", [
            'search' => '%' + str_replace(' ', '%', $request->input('query')) + '%'
          ]);
          break;
        default:
          $results = DB::select("SELECT p.*, SUM(b.amount) AS totalAmt, COUNT(b.*) AS backers FROM project AS p LEFT JOIN project_backer AS b ON p.id = b.project WHERE (p.status = 'ONGOING') GROUP BY p.id ORDER BY p.date_close ASC");
          break;
      }
      return response()->json($results);
    }

    /**
     * URL route for deleting an existing project
     * DELETE /api/project/{project}
     */
    public function destroy(Request $request, $project) {
      DB::statement('BEGIN TRANSACTION');
      $results = DB::update("UPDATE project SET status = 'REVOKED' WHERE id = :projectId", [
          'projectId'   => $project
      ]);
      $backers = DB::select("SELECT * FROM project_backer WHERE project = :project", ['project' => $project]);
      foreach($backers as $backer) {
        $request->replace(array(
          'user' => $backer->member,
          'amount' => $backer->amount,
          'address' => ''
        ));
        app('App\Http\Controllers\TransactionController')->store($request, 'Debit');
      }
      DB::statement('COMMIT');
      return response()->json($results);
    }
}
