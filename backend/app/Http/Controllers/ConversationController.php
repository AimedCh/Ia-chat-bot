<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Public mode: scope to single-tenant public user
        $publicUserId = $this->publicUserId();
        $conversations = Conversation::query()
            ->where('user_id', $publicUserId)
            ->latest('updated_at')
            ->get();

        return response()->json($conversations);
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
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'metadata' => 'nullable|array',
        ]);

        // Public mode: assign to public user
        $publicUserId = $this->publicUserId();
        $conversation = Conversation::create([
            'user_id' => $publicUserId,
            'title' => $data['title'] ?? null,
            'metadata' => $data['metadata'] ?? null,
        ]);

        return response()->json($conversation, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Conversation $conversation)
    {
        $this->authorizeConversation($request, $conversation);
        return response()->json($conversation->load('messages'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Conversation $conversation)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conversation $conversation)
    {
        $this->authorizeConversation($request, $conversation);

        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'metadata' => 'nullable|array',
        ]);

        $conversation->update($data);

        return response()->json($conversation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Conversation $conversation)
    {
        $this->authorizeConversation($request, $conversation);
        $conversation->delete();
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
