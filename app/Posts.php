<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    protected $table = 'posts';
    protected $with = ['postBy'];

    function postBy()
    {
        return $this->hasOne(User::class, 'id', 'post_by');
    }
}
