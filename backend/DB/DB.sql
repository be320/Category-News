-- Database: `croco_news`

CREATE DATABASE IF NOT EXISTS `croco_news` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `croco_news`


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

-- Table structure for table `news_in_category`

DROP TABLE IF EXISTS `news_in_category`;
CREATE TABLE IF NOT EXISTS `news_in_category` (
    `category_id` int(11) NOT NULL,
    `news_id` int(11) NOT NULL,
    PRIMARY KEY (`category_id`,`news_id`),
    KEY `news_in_category_ibfk_2` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Constraints for table `news_in_category`

ALTER TABLE `news_in_category`
  ADD CONSTRAINT `news_in_category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `news_in_category_ibfk_2` FOREIGN KEY (`news_id`) REFERENCES `news` (`news_id`) ON DELETE CASCADE ON UPDATE CASCADE;

