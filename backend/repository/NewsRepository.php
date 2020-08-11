<?php

require_once (__DIR__.'/../models/News.php');
require_once (__DIR__.'/../lib/DBConnection.php');


class NewsRepository
{
    protected $table = 'news';

    public function create($data): bool
    {
        $success = false;

        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("INSERT INTO news (title,image,description,author,link) VALUES (:title,:image,:description,:author,:link)");
            $stmt->bindValue(':title',$data['title']);
            $stmt->bindValue(':image',$data['image']);
            $stmt->bindValue(':description',$data['description']);
            $stmt->bindValue(':author',$data['author']);
            $stmt->bindValue(':link',$data['link']);
            $success = $stmt->execute();
        }
        catch(PDOException $e){
            echo $e->getMessage();
            exit();
        }

        return $success;
    }

    public function deleteById($id): bool
    {
        $success = false;
        try{
            $db = DBConnection::connect();
            $stmt = $db->prepare("DELETE FROM news WHERE news_id = :news_id");
            $stmt->bindValue(':news_id',$id);
            $success = $stmt->execute();
        }
        catch (PDOException $e){
            echo $e->getMessage();
            exit();
        }
        return $success;
    }

    public function getById($id): news
    {
        $result = null;
        try{
            $db = DBConnection::connect();
            $stmt = $db->prepare("SELECT * FROM news WHERE news_id = :news_id");
            $stmt->bindValue(':news_id',$id);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, News::class);
            $result = $stmt->fetch();
        }
        catch (PDOException $e){
            echo $e->getMessage();
            exit();
        }
        return $result;
    }

    public function getByName($title): array
    {
        $result = null;
        try{
            $db = DBConnection::connect();
            $stmt = $db->prepare("SELECT * FROM news WHERE title = :title");
            $stmt->bindValue(':title',$title);
            $stmt->execute();
            $result = $stmt->fetch();
        }
        catch (PDOException $e){
            echo $e->getMessage();
            exit();
        }
        return $result;
    }

    public function update($news): bool
    {
        $success = false;
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("UPDATE news set title=:title, image=:image, description=:description, author=:author, link=:link where news_id = :news_id");
            $stmt->bindValue(':title', $news->getTitle());
            $stmt->bindValue(':image', $news->getImage());
            $stmt->bindValue(':description', $news->getDescription());
            $stmt->bindValue(':author', $news->getAuthor());
            $stmt->bindValue(':link', $news->getLink());
            $stmt->bindValue(':news_id', $news->getId());
            $success = $stmt->execute();
        }
        catch (PDOException $e){
            echo $e->getMessage();
            exit();
        }

        return $success;
    }

    public function getAll(): array
    {
        $result = [];
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("SELECT * from news");
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, News::class);
            $result =$stmt->fetchAll();
        }catch(PDOException $e){
            echo $e->getMessage();
            exit();
        }
        return $result;

    }

    public function checkExist($id): bool
    {
        $result = $this->getById($id);
        if(empty($result)){
            return false;
        }
        return true;
    }
}