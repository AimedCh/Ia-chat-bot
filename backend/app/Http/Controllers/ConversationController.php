<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            // Public mode: scope to single-tenant public user
            $publicUserId = $this->publicUserId();
            $conversations = Conversation::query()
                ->where('user_id', $publicUserId)
                ->latest('updated_at')
                ->get();

            Log::info('Conversations retrieved', ['count' => $conversations->count()]);
            return response()->json($conversations);
        } catch (\Exception $e) {
            Log::error('Failed to retrieve conversations', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to retrieve conversations'], 500);
        }
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
        try {
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

            Log::info('Conversation created', ['id' => $conversation->id, 'title' => $conversation->title]);
            return response()->json($conversation, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Validation failed for conversation creation', ['errors' => $e->errors()]);
            throw $e;
        } catch (\Exception $e) {
            Log::error('Failed to create conversation', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to create conversation'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Conversation $conversation)
    {
        try {
            $this->authorizeConversation($request, $conversation);
            Log::info('Conversation retrieved', ['id' => $conversation->id]);
            return response()->json($conversation->load('messages'));
        } catch (\Exception $e) {
            Log::error('Failed to retrieve conversation', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to retrieve conversation'], 500);
        }
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
        try {
            $this->authorizeConversation($request, $conversation);

            $data = $request->validate([
                'title' => 'nullable|string|max:255',
                'metadata' => 'nullable|array',
            ]);

            $conversation->update($data);
            Log::info('Conversation updated', ['id' => $conversation->id]);

            return response()->json($conversation);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Validation failed for conversation update', ['errors' => $e->errors()]);
            throw $e;
        } catch (\Exception $e) {
            Log::error('Failed to update conversation', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to update conversation'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Conversation $conversation)
    {
        try {
            $this->authorizeConversation($request, $conversation);
            $conversationId = $conversation->id;
            $conversation->delete();
            Log::info('Conversation deleted', ['id' => $conversationId]);
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            Log::error('Failed to delete conversation', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to delete conversation'], 500);
        }
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
