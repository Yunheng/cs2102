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
      $results = DB::insert("INSERT INTO \"project\" (title, description, country, city, category, date_created) VALUES (:title, :description, :country, :city, :category, NOW())", [
          'title'        => $request->input('title'),
          'description'  => $request->input('description'),
          'country'      => $request->input('country'),
          'city'         => $request->input('city'),
          'category'     => $request->input('category'),
      ]);
      return response()->json($results);
    }
}
