<?php

namespace App\Http\Controllers;

use App\Http\Resources\Category\CategoryResource;
use App\Model\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
 


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $node = new Category;
        $node->name = $request->name;
        $parentName = $request->parent;
        $parent = Category::where('name', $parentName)->first();
        $node->appendToNode($parent)->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $category->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
    }

    public function showFamily($name){
        $node = Category::where('name', $name)->first();
        $parent = $node->parent;
        $children =  $node->children;
        $descendants = $node->descendants;
        $ancestors =  $node->ancestors;
        $nodeID = $node['id'];
        return response()->json([
            'parent' => $parent,
            'children' => $children,
            'descendants' => $descendants,
            'ancestors' => $ancestors,
            'id' => $nodeID
        ]);
    }

    public function showNews($name){
        $category = Category::where('name', $name)->first();
        $news = $category->news;
        return response()->json([
            'news' => $news
        ]);
    }
}
