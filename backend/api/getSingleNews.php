<?php
require_once (__DIR__."/../repository/NewsRepository.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Accept");
header('Content-Type: application/json');

$data = $_GET;
$newsID = $data['id'];
$hasErrors = false;
$newsRepo = new NewsRepository();
$news = $newsRepo->getById($newsID);
echo json_encode($news);
exit();