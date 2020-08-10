<?php
require_once (__DIR__."/../repository/CategoryRepository.php");



header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Accept");
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

$hasErrors = false;

$name = $input['name'];
$parent_name = $input['parent_name'];

if(!isset($name) || empty($name) ){
    $hasErrors = true;
}

if( !isset($parent_name) || empty($parent_name) ){
    $hasErrors = true;
}

if($hasErrors === true) {
    $response['status'] = 405;
    $response['message'] = "a parameter is empty";
    echo json_encode($response);
    exit();
}

$categoryRepo = new CategoryRepository();

if($categoryRepo->checkCategoryNameExists($name)){
    $response['status'] = 406;
    $response['message'] = "Category already exists";
    echo json_encode($response);
    exit();
}

$success = false;
if($hasErrors === false){
    $success = $categoryRepo->create($input);
}
if($success){
    $response['status'] = 202;
    $response['message'] = "Category added successfully";
    echo json_encode($response);
    exit();
}