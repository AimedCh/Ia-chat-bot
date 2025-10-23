<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Conversation $conversation)
    {
        $this->authorizeConversation($request, $conversation);
        return response()->json($conversation->messages()->orderBy('created_at')->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Conversation $conversation)
    {
        $this->authorizeConversation($request, $conversation);

        $data = $request->validate([
            'role' => 'required|in:user,assistant,system,tool',
            'content' => 'nullable|string',
            'usage' => 'nullable|array',
            'status' => 'nullable|string',
        ]);

        $message = $conversation->messages()->create($data);

        return response()->json($message, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Conversation $conversation, Message $message)
    {
        $this->authorizeConversation($request, $conversation);
        abort_unless($message->conversation_id === $conversation->id, 404);
        return response()->json($message);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conversation $conversation, Message $message)
    {
        $this->authorizeConversation($request, $conversation);
        abort_unless($message->conversation_id === $conversation->id, 404);

        $data = $request->validate([
            'content' => 'nullable|string',
            'usage' => 'nullable|array',
            'status' => 'nullable|string',
        ]);

        $message->update($data);
        return response()->json($message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Conversation $conversation, Message $message)
    {
        $this->authorizeConversation($request, $conversation);
        abort_unless($message->conversation_id === $conversation->id, 404);
        $message->delete();
        return response()->json(['message' => 'Deleted']);
    }

    private function authorizeConversation(Request $request, Conversation $conversation): void
    {
        // Public mode: only allow access to the public user
        $publicUserId = $this->publicUserId();
        abort_unless($conversation->user_id === $publicUserId, 403);
    }

    private function publicUserId(): int
    {
        // Find by stable unique email to avoid unique constraint issues
        $user = User::where('email', 'public@example.com')->first();
        if (!$user) {
            $user = User::create([
                'name' => 'Public',
                'email' => 'public@example.com',
                'password' => Hash::make(Str::random(32)),
            ]);
        }
        return $user->id;
    }
}
