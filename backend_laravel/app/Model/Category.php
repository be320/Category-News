<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function news()
    {
        return $this->belongsToMany('App\Model\News', 'news_in_category', 'category_id', 'news_id');
    }
}
