PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_blog_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`content` text NOT NULL,
	`isDeploy` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_blog_table`("id", "name", "content", "isDeploy") SELECT "id", "name", "content", "isDeploy" FROM `blog_table`;--> statement-breakpoint
DROP TABLE `blog_table`;--> statement-breakpoint
ALTER TABLE `__new_blog_table` RENAME TO `blog_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;