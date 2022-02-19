<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Posts;
use App\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function getPosts(Request $request)
    {
        return response()->json([
            'allposts' => Posts::all()->toArray()
        ]);
    }

    public function likePost(Request $request)
    {
        $user = User::find($request->id)->first()->toArray();
        $post = Posts::find($request->post_id)->first()->toArray();
        $intial_array = [];
        if ($post['like_by'] != null) {
            $intial_array=json_decode($post['like_by'],true);
            array_push($intial_array, $user['name']);
            Posts::where('id',$request->post_id)->update([
                'like_by'=>json_encode($intial_array)
            ]);

        } else {
            array_push($intial_array, $user['name']);
            Posts::where('id',$request->post_id)->update([
                'like_by'=>json_encode($intial_array)
            ]);
        }
        return response()->json([
            'status' => true,

        ]);
    }
}
