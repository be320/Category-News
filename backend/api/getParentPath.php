<?php
require_once (__DIR__."/../repository/CategoryRepository.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Accept");
header('Content-Type: application/json');

$data = $_GET;

$hasErrors = false;


$categoryRepo = new CategoryRepository();


$parents = $categoryRepo->getParentPath($data['name']);
$children = $categoryRepo->getNearChildCategories($data['name']);

//$parents = json_encode($parents);
//$children = json_encode($children);

$response['parents'] = $parents;
$response['children'] = $children;

echo json_encode($response);

exit();