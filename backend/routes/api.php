<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProviderConfigController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and assigned to the "api"
| middleware group. Make something great!
|
*/

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

// Auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Public routes (no auth)
// Conversations
Route::apiResource('conversations', ConversationController::class)->except(['create', 'edit']);

// Messages nested under conversations
Route::get('/conversations/{conversation}/messages', [MessageController::class, 'index']);
Route::post('/conversations/{conversation}/messages', [MessageController::class, 'store']);
Route::get('/conversations/{conversation}/messages/{message}', [MessageController::class, 'show']);
Route::patch('/conversations/{conversation}/messages/{message}', [MessageController::class, 'update']);
Route::delete('/conversations/{conversation}/messages/{message}', [MessageController::class, 'destroy']);

// Provider configs
Route::apiResource('provider-configs', ProviderConfigController::class)->except(['create', 'edit']);
