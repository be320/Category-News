<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    public function categories()
    {
        return $this->belongsToMany('App\Model\Category', 'news_in_categories','news_id','category_id');
    }
}
