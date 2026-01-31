<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $fillable = [
        'user_id',
        'score',
        'round_data'
    ];

    protected $casts = [
        'round_data' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
