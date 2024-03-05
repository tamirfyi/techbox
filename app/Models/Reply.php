<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'text',
        'visibility',
        'submission_id',
        'reply_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }
}

enum ReplyVisibility: int
{
    case Public = 0;
    case Deleted = 1;
    case Removed = 2;
}
