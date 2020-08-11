<?php
require_once (__DIR__."/../repository/NewsRepository.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Accept");
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

$title = $input['title'];
$newsRepo = new NewsRepository();
$success = $newsRepo->deleteByTitle($title);

if($success){
    $response['status'] = 202;
    $response['message'] = "News: $title  deleted successfully";
    echo json_encode($response);
    exit();
}