<?php
require_once (__DIR__."/../repository/CategoryRepository.php");

$categoryRepo = new CategoryRepository();

$data =$_POST;
$hasErrors = false;

if(!isset($data['name']) || empty($data['name']) ){
    $hasErrors = true;
}

if($categoryRepo->checkCategoryNameExists($data['name'])){
    $error = 'errorNameExists';
    echo $error;
    exit();
}

if( !isset($data['parent_id']) || empty($data['parent_id']) ){
    $hasErrors = true;
}

$success = false;
if($hasErrors === false){
    $success = $categoryRepo->create($data);
}
if($success){
    $state = 'courseAdded Successfully';
    echo $state;
    exit();
}