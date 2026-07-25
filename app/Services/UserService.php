<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

 public function register(array $data): User
{
    $user = $this->userRepository->create([
        'lastname'  => $data['lastname'] ?? null,
        'firstname' => $data['firstname'] ?? null,
        'email'     => $data['email'],
        'password'  => Hash::make($data['password']),
    ]);

    Auth::login($user);
    request()->session()->regenerate();

    return $user; //
}

    /**
     * Create address for authenticated user
     */
    public function AddAdress(array $data)
    {
        $user = Auth::user();

        if (!$user) {
            return null;
        }

        if (!$user->adresse()->exists()) {
            return $user->adresse()->create([
                'adress'  => $data['address'] ?? null,
                'city'    => $data['city'] ?? null,
                'country' => $data['country'] ?? null,
                'zip'     => $data['zip'] ?? null,
            ]);
        }

        return null;
    }

  public function logout(Request $request)
{
    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json([
        'message' => 'Déconnexion réussie.'
    ], 200);
}
}