<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Category extends Model
{
    use NodeTrait;

    protected $fillable =  ['name'];
    
    public function news()
    {
        return $this->belongsToMany('App\Model\News', 'news_in_categories','category_id','news_id');
    }
}
