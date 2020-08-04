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

            self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        }
        catch(PDOException $e){
            echo "Connection failed: " . $e->getMessage();
            exit();
        }

        return self::$conn;
    }
}
