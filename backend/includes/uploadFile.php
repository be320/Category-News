<?php
function uploadFile($image)
{
    $target_dir = __DIR__ . "/../images/";

    $target_file = $target_dir . basename($image["name"]);

    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));


    // Check file size
    if ($image["size"] > 500000) {
        echo "Sorry, your file is too large.";
        return false;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "jfif"
        && $imageFileType != "gif") {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        return false;
    }

    // start upload file
    if (move_uploaded_file($image["name"], $target_file)) {
        // Upload success
        return $target_dir;

    } else {
        echo 'fourth false';
        return false;
    }
    exit();
}