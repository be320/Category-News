<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{

    protected $fillable =  ['title','description','author','link','image','content'];

    public function categories()
    {
        return $this->belongsToMany('App\Model\Category', 'news_in_categories','news_id','category_id');
    }
}
