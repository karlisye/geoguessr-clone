<?php

use App\Http\Controllers\ScoreController;
use App\Http\Controllers\UserController;
use App\Models\Location;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});
Route::get('/scores', [ScoreController::class, 'index']);

Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/scores/store', [ScoreController::class, 'store']);
    Route::get('/play', function () {
        $locations = Location::all();
        return Inertia::render('Game/Game', ['locations' => $locations]);
    });
});

Route::middleware(['guest'])->group(function () {
    Route::get('/login', [UserController::class, 'showLogin']);
    Route::post('/login', [UserController::class, 'login']);
    Route::get('/register', [UserController::class, 'showRegister']);
    Route::post('/register', [UserController::class, 'register']);
});
