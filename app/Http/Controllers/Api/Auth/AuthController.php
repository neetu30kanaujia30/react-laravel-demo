<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if (!auth()->attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        $user = $request->user();
        $user->last_visit = Carbon::now();
        $user->save();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();
        Session::put('user_id', $user->id);
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
            'user_id' => $user->id,
            'check' => Session::get('user_id'),
        ]);
    }

    public function signup(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'phone' => ['required', 'string', 'min:10'],
        ]);
        try {
            $user = new User();
            $user->name = $request->name;
            $user->phone = $request->phone;
            $user->email = $request->get('email');
            $user->password = Hash::make($request->get('password'));
            $user->ip_address = request()->ip();
            $user->verify_token = rand(100000, 999999);
            $user->save();
            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->token;
            $token->save();
            return response()->json([
                'access_token' => $tokenResult->accessToken,
                'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
                'user' => $user,
                'status' => true,
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'error_code' => $exception->getCode(),
                'error_message' => $exception->getMessage(),
                'status' => false,
            ]);
        }
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json(compact('user'));
    }
}
