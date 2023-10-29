CREATE TABLE `linked_articles` (
	`id` char(26) NOT NULL,
	`published_at` date NOT NULL,
	`title` varchar(255) NOT NULL,
	`url` varchar(512) NOT NULL,
	`image_src` varchar(1024),
	`source_id` char(26) NOT NULL,
	`sentiment` int,
	`relevance` int,
	CONSTRAINT `linked_articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `unique_article_url` UNIQUE(`url`)
);
