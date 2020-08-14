<?php
require_once (__DIR__."/../repository/NewsRepository.php");
require_once (__DIR__."/../repository/CategorizeRepository.php");
require_once (__DIR__."/../repository/CategoryRepository.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Accept");
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);
$hasErrors = false;
$news= $input['news'];
$content = $input['content'];
$categories = $input['categories'];
$image =  $input['image'] ;
$title = $news['title'];
$description = $news['description'];
$author = $news['author'];
$link = $news['link'];


if(!isset($title) || empty($title) ){
    $hasErrors = true;
}

if(!isset($content) || empty($content) ){
    $hasErrors = true;
}


if( !isset($description) || empty($description) ){
    $hasErrors = true;
}

if( !isset($author) || empty($author) ){
    $hasErrors = true;
}

if( !isset($image) || empty($image) ){
    $hasErrors = true;
}

if( !isset($link) || empty($link) ){
    $hasErrors = true;
}

if( !isset($categories) || empty($categories) ){
    $hasErrors = true;
}

if($hasErrors === true) {
    $response['status'] = 405;
    $response['message'] = "a parameter is empty";
    echo json_encode($response);
    exit();
}

$newsRepo = new NewsRepository();
$categorizeRepo = new CategorizeRepository();
$categoryRepo = new CategoryRepository();

$success = false;
if($hasErrors === false){
    $success = $newsRepo->create($news,$image,$content);
    $insertedNews = $newsRepo->getByName($title);
    foreach ($categories as $cat) {
        $category = $categoryRepo->getByName($cat);
        $success =  $categorizeRepo->categorizeNews($category->getCategoryId(), $insertedNews[0]);
    }

}
if($success){
    $response['status'] = 202;
    $response['message'] = "News: $title  added successfully";
    echo json_encode($response);
    exit();
}