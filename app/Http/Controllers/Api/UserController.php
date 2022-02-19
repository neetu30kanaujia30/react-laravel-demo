<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
class UserController extends Controller
{
    public function getUsers(Request $request)
    {
        return response()->json([
            'allusers' => User::all()->except((int)$request->id)->toArray(),
            'auth_user' => $request->id ? User::find((int)$request->id)->toArray() : null,
        ]);
    }
    public function saveAvatar(Request $request)
    {
        $request->validate([
            'file' => ['required', 'image', 'mimes:jpg,png,jpeg,gif', 'max:4096'],
        ]);
        $user = User::find(1);
        $file = $request->file('file');
        $image_name = $file->getClientOriginalName();
        $filePath = '/profile-pic/' . $image_name;
        $request->file->move(public_path("/profile-pic"), $image_name);
        $user->profile_pic = $filePath;
        $user->save();
        return response()->json(compact('user'));
    }
    public function removeAvatar(Request $request)
    {
     $user = User::find($request->id);
        if(file_exists(public_path($user->profile_pic))){
            unlink(public_path($user->profile_pic));
            User::where('id',$request->id)->update(['profile_pic'=>null]);
            return response()->json([
                'status' => true,
                'user'=>$user
            ]);
        }else{
            return response()->json([
                'status' => false,
                'msg'=>'File does not exists'
            ]);
        }
    }
    public function getProfile(Request $request){
        dd($request->all());
        return response()->json([
            'user_details' => $request->id ? User::find((int)$request->id)->toArray() : null,
        ]);
    }
    public function editProfile(Request $request){
        dd($request->all());
    }
}
