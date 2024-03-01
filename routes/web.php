<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubmissionsController;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    //Find submissions
    $submissions = Submission::all();
    $submissions_with_metadata = [];

    foreach ($submissions as $submission) {
        $user = User::find($submission->user_id);
        $submission_with_metadata = (object) [
            'id' => $submission->id,
            'title' => $submission->title,
            'url' => $submission->url,
            'text' => $submission->text,
            'created_at' => $submission->created_at,
            'username' => $user->name,
        ];

        $submissions_with_metadata[] = $submission_with_metadata;
    }

    //TODO: Find better way to conditionally render authed/unauthed
    if (Auth::check()) {
        return Inertia::render('Home', ['submissions' => $submissions_with_metadata]);
    } else {
        return redirect(route('login'));
    }
});

Route::prefix('item')->group(function () {
    Route::get('/{id}', [SubmissionsController::class, 'show'])->name('item');
});


Route::prefix('submit')->group(function () {
    Route::get('/', [SubmissionsController::class, 'create'])->name('submit');
    Route::post('/', [SubmissionsController::class, 'store'])->name('submit');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
