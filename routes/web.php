<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});
Route::get('/scores', [ScoreController::class, 'show']);
Route::get('/scores/{user_id}/{id}', [ScoreController::class, 'showShare']);

Route::middleware(['guest'])->group(function () {
    Route::get('/register', [AuthController::class, 'showRegister']);
    Route::get('/login', [AuthController::class, 'showLogin']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/play', [GameController::class, 'show']);
    Route::post('/score', [ScoreController::class, 'store']);
    Route::get('/scores/{id}', [ScoreController::class, 'showHistory']);
    Route::get('/finish/{score}', [GameController::class, 'finish']);
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::patch('/scores/update/{id}', [ScoreController::class, 'update']);
    Route::delete('/scores/{id}', [ScoreController::class, 'destroy']);
});