<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Category extends Model
{
    use NodeTrait;
    
    public function news()
    {
        return $this->belongsToMany('App\Model\News', 'news_in_category', 'category_id', 'news_id');
    }
}
