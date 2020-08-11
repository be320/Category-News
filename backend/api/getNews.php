<?php
require_once (__DIR__."/../repository/CategorizeRepository.php");
require_once (__DIR__."/../repository/CategoryRepository.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Accept");
header('Content-Type: application/json');

$data = $_GET;

$title = $data['title'];


$hasErrors = false;


$categorizeRepo = new CategorizeRepository();
$categoryRepo = new CategoryRepository();
$category = $categoryRepo->getByName($title);
$catID = $category->getCategoryId();
$news = $categorizeRepo->getNewsInCategory($catID);
echo json_encode($news);

exit();