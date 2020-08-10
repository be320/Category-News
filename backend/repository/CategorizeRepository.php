<?php
require_once (__DIR__.'/../models/News.php');
require_once (__DIR__.'/../models/Category.php');
require_once (__DIR__.'/../lib/DBConnection.php');

class CategorizeRepository{
    protected $table = 'news_in_category';

    public function categorizeNews($category, $news): bool{
        $success = false;

        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("INSERT INTO $this->table (category_id, news_id) VALUES(:category, :news)");
            $stmt->bindValue(':category',$category);
            $stmt->bindValue(':news',$news);
            $success = $stmt->execute();
        }
        catch (PDOException $e){
            echo $e->getMessage();
        }
        return $success;
    }


    public function removeNewsFromCategory($category, $news): bool
    {
        $success = false;
        try{
            $db = DBConnection::connect();
            $stmt = $db->prepare("DELETE FROM $this->table WHERE category_id=:category AND news_id=:news");
            $stmt->bindValue(':category',$category);
            $stmt->bindValue(':news',$news);
            $success = $stmt->execute();
        }
        catch (PDOException $e){
            echo $e->getMessage();
        }
        return $success;
    }


    public function getNewsInCategory($category): array
    {
        $result = [];
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("SELECT * from $this->table qry JOIN category cat ON (qry.category_id = cat.category_id) JOIN news nws ON (qry.news_id = nws.news_id) WHERE qry.category_id=:category ");
            $stmt->bindValue(':category',$category);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, Category::class);
            $result =$stmt->fetchAll();
        }catch(PDOException $e){
            echo $e->getMessage();
            exit();
        }
        return $result;

    }


}

//SELECT category.OrderID, Customers.CustomerName
//FROM Orders
//INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

