<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubmissionsController extends Controller
{
    public function index()
    {
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
    }

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
        $user = User::find($submission->user_id);
        $submission_with_metadata = (object) [
            'id' => $submission->id,
            'title' => $submission->title,
            'url' => $submission->url,
            'text' => $submission->text,
            'created_at' => $submission->created_at,
            'username' => $user->name,
            'user_id' => $user->id,
        ];
        return Inertia::render('Submission', ["submission" => $submission_with_metadata]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $submission = Submission::find($id);
        $submission->text = $request->text;
        $submission->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
