<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Models\SubmissionVisibility;
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
        $submissions = Submission::all()->where('visibility', SubmissionVisibility::Public);
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
            'title' => 'required|string',
            'url' => 'nullable|string',
            'text' => 'required|string',
            'visibility' => 'nullable|integer'
        ]);

        $submission = Submission::create([
            'title' => $request['title'],
            'url' => $request['url'],
            'text' => $request['text'],
            'visibility' => SubmissionVisibility::Public,
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
        $submission = Submission::find($id);
        return Inertia::render('Edit', ["submission" => $submission]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string',
            'url' => 'nullable|string',
            'text' => 'required|string',
        ]);

        $submission = Submission::find($id);
        $submission->title = $request['title'];
        $submission->url = $request['url'];
        $submission->text = $request['text'];
        $submission->save();

        return redirect(route('item', $id));
    }

    /**
     * Update the status of submission to be 'deleted'
     * (deleted = not visible to public, but remains in database)
     */
    public function delete(string $id)
    {
        $submission = Submission::find($id);
        $submission->visibility = SubmissionVisibility::Deleted;
        $submission->save();

        return redirect("/");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
    }
}
