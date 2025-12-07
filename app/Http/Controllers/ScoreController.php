<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScoreController extends Controller
{
    public function store (Request $request) {
        $incomingFields = $request->validate([
            'user_id' => ['required'],
            'score' => ['required']
        ]);

        Score::create($incomingFields);
    }

    public function index () {
        $scores = Score::with('user')->orderBy('score', 'desc')->paginate(10);
        return Inertia::render('Leaderboard', ['scores' => $scores]);
    }
}
