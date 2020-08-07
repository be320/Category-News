<?php

require_once (__DIR__.'/../models/Category.php');
require_once (__DIR__.'/../lib/DBConnection.php');


class CategoryRepository
{
    protected $table = 'category';

    public function create($data): bool
    {
        $success = false;

        try {
           $db = DBConnection::connect();
           $stmt = $db->prepare("INSERT INTO category (name,parent_id) VALUES (:name,:parent_id)");
           $stmt->bindValue(':name',$data['name']);
           $stmt->bindValue(':parent_id',$data['parent_id']);
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
            $stmt = $db->prepare("DELETE FROM category WHERE category_id = :category_id");
            $stmt->bindValue(':category_id',$id);
            $success = $stmt->execute();
        }
        catch (PDOException $e){
            echo $e->getMessage();
            exit();
        }
        return $success;
    }

    public function getById($id): category
    {
        $result = null;
        try{
            $db = DBConnection::connect();
            $stmt = $db->prepare("SELECT * FROM category WHERE category_id = :category_id");
            $stmt->bindValue(':category_id',$id);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, Category::class);
            $result = $stmt->fetch();
        }
        catch (PDOException $e){
            echo $e->getMessage();
            exit();
        }
        return $result;
    }

    public function update($category): bool
    {
        $success = false;
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("UPDATE category set name=:name where category_id = :category_id");
            $stmt->bindValue(':name', $category->getName());
            $stmt->bindValue(':category_id', $category->getId());
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
            $stmt = $db->prepare("SELECT * from category");
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, Category::class);
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