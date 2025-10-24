<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Conversation $conversation)
    {
        try {
            $this->authorizeConversation($request, $conversation);
            $messages = $conversation->messages()->orderBy('created_at')->get();
            Log::info('Messages retrieved', ['conversation_id' => $conversation->id, 'count' => $messages->count()]);
            return response()->json($messages);
        } catch (\Exception $e) {
            Log::error('Failed to retrieve messages', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to retrieve messages'], 500);
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
    public function store(Request $request, Conversation $conversation)
    {
        try {
            $this->authorizeConversation($request, $conversation);

            $data = $request->validate([
                'role' => 'required|in:user,assistant,system,tool',
                'content' => 'nullable|string',
                'usage' => 'nullable|array',
                'status' => 'nullable|string',
            ]);

            $message = $conversation->messages()->create($data);
            Log::info('Message created', ['id' => $message->id, 'conversation_id' => $conversation->id, 'role' => $message->role]);

            return response()->json($message, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Validation failed for message creation', ['errors' => $e->errors()]);
            throw $e;
        } catch (\Exception $e) {
            Log::error('Failed to create message', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to create message'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Conversation $conversation, Message $message)
    {
        try {
            $this->authorizeConversation($request, $conversation);
            abort_unless($message->conversation_id === $conversation->id, 404);
            Log::info('Message retrieved', ['id' => $message->id]);
            return response()->json($message);
        } catch (\Exception $e) {
            Log::error('Failed to retrieve message', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to retrieve message'], 500);
        }
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
        try {
            $this->authorizeConversation($request, $conversation);
            abort_unless($message->conversation_id === $conversation->id, 404);

            $data = $request->validate([
                'content' => 'nullable|string',
                'usage' => 'nullable|array',
                'status' => 'nullable|string',
            ]);

            $message->update($data);
            Log::info('Message updated', ['id' => $message->id]);
            return response()->json($message);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Validation failed for message update', ['errors' => $e->errors()]);
            throw $e;
        } catch (\Exception $e) {
            Log::error('Failed to update message', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to update message'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Conversation $conversation, Message $message)
    {
        try {
            $this->authorizeConversation($request, $conversation);
            abort_unless($message->conversation_id === $conversation->id, 404);
            $messageId = $message->id;
            $message->delete();
            Log::info('Message deleted', ['id' => $messageId]);
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            Log::error('Failed to delete message', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to delete message'], 500);
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
