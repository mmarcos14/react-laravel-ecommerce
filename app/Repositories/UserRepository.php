<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function create(array $data)
    {
        return User::create($data);
    }

    public function findByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }

    public function findById(int $id)
    {
        return User::find($id);
    }

    public function getAll()
    {
        return User::latest()->get();
    }
}