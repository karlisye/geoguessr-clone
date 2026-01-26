<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin () {
        return Inertia::render('Auth/Login');
    }

    public function showRegister () {
        return Inertia::render('Auth/Register');
    }

    public function register (Request $request) 
    {
        $credentials = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'confirmed', Password::min(8)
                ->mixedCase()->letters()->symbols()->numbers()]
        ]);
        $credentials['password'] = bcrypt($credentials['password']);

        $user = User::create($credentials);
        Auth::login($user);

        return redirect('/');
    }

    public function login (Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect('/');
        }

        return back()->withErrors([
            'email' => 'Incorrect credentials'
        ]);
    }

    public function logout (Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
