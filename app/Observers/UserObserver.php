<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
  public function creating(User $user): void
{
    $lastUser = User::latest()->first();

    if ($lastUser && !empty($lastUser->ucode)) {

        $code = str_replace("U", "", $lastUser->ucode);

        $increase = (int) $code + 1;

        $string = str_pad($increase, 5, "0", STR_PAD_LEFT);

        $user->ucode = "U" . $string;

    } else {

        $user->ucode = "U00001";
    }
}

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
