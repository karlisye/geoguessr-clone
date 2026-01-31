<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    public function show () 
    {
        return Inertia::render('Game/Game');
    }

    public function finish(Score $score)
    {
        if ($score->user_id !== auth()->id()) {
            abort(403);
        }

        $score->load("user");

        return inertia('Game/views/FinishView', [
            'roundData' => $score->round_data,
            'score' => $score
        ]);
    }

}
