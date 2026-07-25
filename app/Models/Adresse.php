<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adresse extends Model
{
    protected $table="adresses";
    protected $fillable = ['user_id','adress','city','country','zip'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
