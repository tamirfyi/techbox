<?php

namespace App\Http\Controllers;

use App\Models\Reply;
use App\Models\ReplyVisibility;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

class RepliesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required',
            'reply_id' => 'string|nullable',
            'submission_id' => 'string|nullable',
        ]);

        $reply = Reply::create([
            'text' => $request['text'],
            'reply_id' => $request['reply_id'],
            'submission_id' => $request['submission_id'],
            'user_id' => auth()->user()->getAuthIdentifier(),
            'visibility' => ReplyVisibility::Public,
        ]);

        return redirect(route('item', ['id' => $request['submission_id']]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
