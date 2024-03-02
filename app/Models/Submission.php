<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'title',
        'url',
        'text',
        'visibility',
        'category',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

enum SubmissionCategory: int
{
    case All = 0;
    case Ask = 1;
    case Show = 2;
    case Jobs = 3;
}

enum SubmissionVisibility: int
{
    case Public = 0;
    case Private = 1;
    case Deleted = 2;
    case Hidden = 3;
    case Removed = 4;
}
