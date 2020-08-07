-- Database: `croco_news`

CREATE DATABASE IF NOT EXISTS `croco_news` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `croco-news`


-- Table structure for table `category`

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
    `category_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `parent_id` int(11) NULL ,
    PRIMARY KEY(`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--Inserting the Master Category `news`

INSERT INTO `category` (`name`,`parent_id`) VALUES ('news',NULL);


-- Table structure for table `news`

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
    `news_id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `author` varchar(255) NOT NULL,
    `link` varchar(255) NOT NULL,
    PRIMARY KEY(`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `news`
