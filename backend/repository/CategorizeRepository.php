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


    public function getNewsInCategory($categoryId): array
    {
        $result = [];
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("select n.* from news n inner join news_in_category nc on n.news_id = nc.news_id inner join category c on nc.category_id = :category GROUP BY n.title ");
            $stmt->bindValue(':category',$categoryId);
            $stmt->execute();
            $result =$stmt->fetchAll();
        }catch(PDOException $e){
            echo $e->getMessage();
            exit();
        }
        return $result;

    }




}





