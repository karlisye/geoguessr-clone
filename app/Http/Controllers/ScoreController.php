<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScoreController extends Controller
{
    public function store (Request $request)
    {
        $incomingFields = $request->validate([
            'score' => ['required']
        ]);
        $incomingFields['user_id'] = auth()->id();

        Score::create($incomingFields);

        return Inertia::render('Game/views/FinishView', [
            'roundData' => $request['roundData'],
            'score' => $incomingFields["score"]
        ]);
    }

    public function show (Request $request) {
        $incomingFields = $request->validate([
            'sort_by' => ['nullable'],
            'sort' => ['nullable']
        ]);
        
        $users = User::all();
        $scores = Score::with('user')->orderBy($incomingFields['sort_by'] ?? 'score', $incomingFields['sort'] ?? 'desc')->paginate(10);

        return Inertia::render('Leaderboard', ['scores' => $scores, 'users' => $users]);
    }

    public function update (Request $request, $id)
    {
        $incomingFields = $request->validate([
            "user_id" => ["required", "exists:users,id"],
            "score" => ["required", "numeric", "min:0"],
            "created_at" => ["required", "date"]
        ]);

        $score = Score::findOrFail($id);
        $score->update($incomingFields);

        return redirect()->back();
    }

    public function destroy (Request $request, $id)
    {
        $score = Score::findOrFail($id);
        $score->delete();

        return redirect()->back();
    }

    public function showHistory ($id)
    {
        $scores = Score::with("user")->where("user_id", $id)->orderBy("created_at", "desc")->get();
        return Inertia::render("History", ["scores" => $scores]);
    }

    public function showShare ($user_id, $id)
    {
        $score = Score::with("user")->where("user_id", $user_id)->findOrFail($id);
        
        return Inertia::render("Score", ["score" => $score]);
    }
}
