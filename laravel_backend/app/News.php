<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    public function categories(){
        return $this->belongsToMany(Category::class);
    }
}
