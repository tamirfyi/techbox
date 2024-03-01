<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubmissionsController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Submit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:64',
            'url' => 'nullable|string|max:255',
            'text' => 'required|string',
        ]);

        $submission = Submission::create([
            'title' => $request->title,
            'url' => $request->url,
            'text' => $request->text,
            'user_id' => auth()->user()->getAuthIdentifier()
        ]);

        // Event used to send email notification
        // event(new Registered($user));

        return redirect('/');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $submission = Submission::find($id);
        return Inertia::render('Submission', ["submission" => $submission]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
