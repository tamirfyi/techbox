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

Route::get('/', [SubmissionsController::class, 'index']);

Route::prefix('item')->group(function () {
    Route::get('/{id}', [SubmissionsController::class, 'show'])->name('item');
});

Route::prefix('edit')->group(function () {
    Route::get('/{id}', [SubmissionsController::class, 'edit'])->name('item.edit');
    Route::put('/{id}', [SubmissionsController::class, 'update'])->name('item.update');
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
