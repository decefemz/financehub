CREATE TABLE `article_sources` (
	`id` char(26) NOT NULL,
	`name` varchar(255) NOT NULL,
	`url` varchar(512) NOT NULL,
	CONSTRAINT `article_sources_id` PRIMARY KEY(`id`),
	CONSTRAINT `unique_article_src_url` UNIQUE(`url`)
);
--> statement-breakpoint
CREATE TABLE `original_articles` (
	`id` char(26) NOT NULL,
	`published_at` date NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	CONSTRAINT `original_articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` char(26) NOT NULL,
	`user_account_id` char(26) NOT NULL,
	`user_profile_id` char(26) NOT NULL,
	`created_at` date NOT NULL,
	`expires_at` date NOT NULL,
	`user_agent` varchar(512),
	`ip_address` varchar(64),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_accounts` (
	`id` char(26) NOT NULL,
	`created_at` date NOT NULL,
	`last_login` date NOT NULL,
	`auth_provider` enum('CREDENTIALS','GOOGLE') NOT NULL,
	`password_hash` varchar(255),
	`user_profile_id` char(26) NOT NULL,
	CONSTRAINT `user_accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` char(26) NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`full_name` varchar(255),
	`profile_img_url` varchar(512),
	`email_verified_at` date,
	CONSTRAINT `user_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_profiles_username_unique` UNIQUE(`username`),
	CONSTRAINT `user_profiles_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `linked_articles` ADD `description` text;--> statement-breakpoint
ALTER TABLE `linked_articles` ADD `content` text;--> statement-breakpoint
ALTER TABLE `linked_articles` ADD `keywords` text;--> statement-breakpoint
ALTER TABLE `linked_articles` ADD `countries` text;--> statement-breakpoint
ALTER TABLE `linked_articles` ADD `categories` text;--> statement-breakpoint
CREATE INDEX `username_index` ON `article_sources` (`url`);--> statement-breakpoint
CREATE INDEX `username_index` ON `user_profiles` (`username`);--> statement-breakpoint
CREATE INDEX `email_index` ON `user_profiles` (`email`);