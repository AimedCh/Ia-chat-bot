<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProviderConfig extends Model
{
    protected $fillable = [
        'user_id',
        'provider',
        'model',
        'api_key',
        'settings',
    ];

    protected $casts = [
        'settings' => 'array',
    ];

    protected $hidden = [
        'api_key',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
