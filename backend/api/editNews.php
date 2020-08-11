<?php
require_once (__DIR__."/../repository/NewsRepository.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Accept");
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);
$hasErrors = false;
$news= $input['news'];
$title = $news['title'];
$image = $news['image'];
$description = $news['description'];
$author = $news['author'];
$link = $news['link'];
$oldName = $input['old_name'];


if(!isset($oldName) || empty($oldName) ){
    $hasErrors = true;
}

if(!isset($title) || empty($title) ){
    $hasErrors = true;
}

if( !isset($image) || empty($image) ){
    $hasErrors = true;
}

if( !isset($description) || empty($description) ){
    $hasErrors = true;
}

if( !isset($author) || empty($author) ){
    $hasErrors = true;
}

if( !isset($link) || empty($link) ){
    $hasErrors = true;
}


if($hasErrors === true) {
    $response['status'] = 405;
    $response['message'] = "a parameter is empty";
    echo json_encode($response);
    exit();
}

$newsRepo = new NewsRepository();


$success = false;
if($hasErrors === false){
    $success = $newsRepo->update($title,$image,$description,$author,$link,$oldName);
}
if($success){
    $response['status'] = 202;
    $response['message'] = "News: $oldName  edited successfully";
    echo json_encode($response);
    exit();
}