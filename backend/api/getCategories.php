<?php
require_once (__DIR__."/../repository/CategoryRepository.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Accept");
header('Content-Type: application/json');

$data = $_GET;

$hasErrors = false;


$categoryRepo = new CategoryRepository();

$categories = $categoryRepo->getAll();

echo json_encode($categories);

exit();
