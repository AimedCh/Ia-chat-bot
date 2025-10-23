<?php

namespace App\Http\Controllers;

use App\Models\ProviderConfig;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ProviderConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Public mode: scope to single-tenant public user
        $publicUserId = $this->publicUserId();
        $configs = ProviderConfig::where('user_id', $publicUserId)->get();
        return response()->json($configs);
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
            'provider' => 'required|string|max:50',
            'model' => 'nullable|string|max:100',
            'api_key' => 'nullable|string',
            'settings' => 'nullable|array',
        ]);

        // Public mode: assign to public user
        $publicUserId = $this->publicUserId();
        $config = ProviderConfig::create([
            'user_id' => $publicUserId,
        ] + $data);

        return response()->json($config, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, ProviderConfig $providerConfig)
    {
        $this->authorizeConfig($request, $providerConfig);
        return response()->json($providerConfig);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProviderConfig $providerConfig)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProviderConfig $providerConfig)
    {
        $this->authorizeConfig($request, $providerConfig);

        $data = $request->validate([
            'provider' => 'sometimes|required|string|max:50',
            'model' => 'nullable|string|max:100',
            'api_key' => 'nullable|string',
            'settings' => 'nullable|array',
        ]);

        $providerConfig->update($data);
        return response()->json($providerConfig);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, ProviderConfig $providerConfig)
    {
        $this->authorizeConfig($request, $providerConfig);
        $providerConfig->delete();
        return response()->json(['message' => 'Deleted']);
    }

    private function authorizeConfig(Request $request, ProviderConfig $config): void
    {
        // Public mode: only allow access to the public user
        $publicUserId = $this->publicUserId();
        abort_unless($config->user_id === $publicUserId, 403);
    }

    private function publicUserId(): int
    {
        $user = User::find(1);
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

