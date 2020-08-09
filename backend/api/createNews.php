<?php
require_once (__DIR__."/../repository/NewsRepository.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Accept");
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);
$hasErrors = false;

$title = $input['title'];
$image = $input['image'];
$description = $input['description'];
$author = $input['author'];
$link = $input['link'];


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
    $success = $newsRepo->create($input);
}
if($success){
    $response['status'] = 202;
    $response['message'] = "News added successfully";
    echo json_encode($response);
    exit();
}