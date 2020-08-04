<?php

require_once(__DIR__ . '/../config/app.php');

class DBConnection
{
    protected static $conn;

    protected function __construct()
    {
    }

    public static function connect()
    {
        global $dbServerName, $dbPassword, $dbName, $dbUserName;

        if(!empty(self::$conn)){
            return self::$conn;
        }
        try{
            self::$conn = new PDO("mysql:host=$dbServerName;dbname=$dbName;charset=utf8", $dbUserName, $dbPassword);
            
        }
        catch(PDOException $e){

        }
    }
}
