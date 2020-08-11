<?php
require_once (__DIR__."/../repository/CategoryRepository.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Accept");
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

$name = $input['name'];
$categoryRepo = new CategoryRepository();
$success = $categoryRepo->deleteByName($name);

if($success){
    $response['status'] = 202;
    $response['message'] = "Category: $name and its children deleted successfully";
    echo json_encode($response);
    exit();
}
