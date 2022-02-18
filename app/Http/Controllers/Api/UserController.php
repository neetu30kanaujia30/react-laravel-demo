<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
  public function getUsers(){
return response()->json([
    'allusers'=>User::all()->toArray(),
    'auth_user'=>User::find(1)->toArray(),
]);
  }
  public function saveAvatar(Request $request){
      $request->validate([
          'file' => ['required', 'image', 'mimes:jpg,png,jpeg,gif', 'max:4096'],
      ]);
      $user = User::find(1);
      if ($user->profile_pic ?? null) {
          Storage::disk('public')->delete($user->profile_pic);
      }
      $file = $request->file('file');
      $filePath = Storage::disk('public')->putFile("avatars/" . $user->id, $file, 'public');

      $user->profile_pic = $filePath;
      $user->save();
      return response()->json(compact('user'));
  }

  public function removeAvatar(Request $request){
      dd('88888');
  }
}
