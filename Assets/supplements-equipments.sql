CREATE TABLE `inventory_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`base_count` INT NOT NULL,
	`total_count` INT NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `equipment_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`inventory_id` INT NOT NULL,
	`brand_name` VARCHAR(255) NOT NULL UNIQUE,
	`equipment_type` VARCHAR(255) NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE `supplement_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`inventory_id` INT NOT NULL,
	`supplement_name` VARCHAR(255) NOT NULL UNIQUE,
	`classification` VARCHAR(255) NOT NULL,
	PRIMARY KEY(`id`)
);

ALTER TABLE `equipment_table`
ADD FOREIGN KEY(`inventory_id`) REFERENCES `inventory_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `inventory_table`
ADD FOREIGN KEY(`id`) REFERENCES `supplement_table`(`inventory_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;