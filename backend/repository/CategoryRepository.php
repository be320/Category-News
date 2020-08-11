<?php

require_once(__DIR__ . '/../models/Category.php');
require_once(__DIR__ . '/../lib/DBConnection.php');


class CategoryRepository
{
    protected $table = 'category';

    public function create($data): bool
    {
        $success = false;

        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("LOCK TABLE category WRITE");
            $stmt->execute();
            $stmt = $db->prepare("SELECT @myLeft := lft FROM category WHERE name = :name ");
            $stmt->bindValue(':name', $data['parent_name']);
            $stmt->execute();
            $stmt = $db->prepare("UPDATE category SET rgt = rgt + 2 WHERE rgt > @myLeft");
            $stmt->execute();
            $stmt = $db->prepare("UPDATE category SET lft = lft + 2 WHERE lft > @myLeft");
            $stmt->execute();
            $stmt = $db->prepare("INSERT INTO category(name, lft, rgt) VALUES(:name, @myLeft + 1, @myLeft + 2)");
            $stmt->bindValue(':name', $data['name']);
            $stmt->execute();
            $stmt = $db->prepare("UNLOCK TABLES");
            $success = $stmt->execute();
        } catch (PDOException $e) {
            echo $e->getMessage();
            exit();
        }

        return $success;
    }

    public function deleteById($id): bool
    {
        $success = false;
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("DELETE FROM category WHERE category_id = :category_id");
            $stmt->bindValue(':category_id', $id);
            $success = $stmt->execute();
        } catch (PDOException $e) {
            echo $e->getMessage();
            exit();
        }
        return $success;
    }

    public function getById($id): category
    {
        $result = null;
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("SELECT * FROM category WHERE category_id = :category_id");
            $stmt->bindValue(':category_id', $id);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, Category::class);
            $result = $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
            exit();
        }
        return $result;
    }

    public function getByName($name): category
    {
        $result = null;
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("SELECT * FROM category WHERE name = :name");
            $stmt->bindValue(':name', $name);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, Category::class);
            $result = $stmt->fetch();
        } catch (PDOException $e) {
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
        } catch (PDOException $e) {
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
            $result = $stmt->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage();
            exit();
        }
        return $result;

    }

    public function getParentPath($name): array
    {
        $result = [];
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("SELECT parent.name
FROM category AS node,
        category AS parent
WHERE node.lft BETWEEN parent.lft AND parent.rgt
        AND node.name = :name
ORDER BY parent.lft;
");
            $stmt->bindValue(':name', $name);
            $stmt->execute();
            $result = $stmt->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage();
            exit();
        }
        return $result;
    }


    public function getNearChildCategories($name): array
    {
        $result = [];
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare("SELECT node.name, (COUNT(parent.name) - (sub_tree.depth + 1)) AS depth
FROM category AS node,
     category AS parent,
     category AS sub_parent,
        (
                SELECT node.name, (COUNT(parent.name) - 1) AS depth
                FROM category AS node,
                     category AS parent
                WHERE node.lft BETWEEN parent.lft AND parent.rgt
                        AND node.name = :name
                GROUP BY node.name
                ORDER BY node.lft
        )AS sub_tree
WHERE node.lft BETWEEN parent.lft AND parent.rgt
        AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt
        AND sub_parent.name = sub_tree.name
GROUP BY node.name
HAVING depth = 1
ORDER BY node.lft");
            $stmt->bindValue(':name', $name);
            $stmt->execute();
            $result = $stmt->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage();
            exit();
        }
        return $result;
    }


    public function checkExist($id): bool
    {
        $result = $this->getById($id);
        if (empty($result)) {
            return false;
        }
        return true;
    }

    public function checkCategoryNameExists($name): bool
    {
        $result = [];
        try {
            $db = DBConnection::connect();
            $stmt = $db->prepare('SELECT * FROM category WHERE name = :name');
            $stmt->bindValue(':name', $name);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, Category::class);
            $result = $stmt->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage();
            exit();
        }
        if (empty($result)) {
            return false;
        }
        return true;
    }
}