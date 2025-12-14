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
            'score' => ['required'],
        ]);

        Score::create($incomingFields);

        return redirect('/scores');
    }

    public function index (Request $request) {
        $incomingFields = $request->validate([
            'sort_by' => ['nullable'],
            'sort' => ['nullable']
        ]);

        $scores = Score::with('user')->orderBy($incomingFields['sort_by'] ?? 'score', $incomingFields['sort'] ?? 'desc')->paginate(10);

        return Inertia::render('Leaderboard', ['scores' => $scores]);
    }
}
