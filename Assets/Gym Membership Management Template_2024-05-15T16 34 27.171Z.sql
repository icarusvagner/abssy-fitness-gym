CREATE TABLE `member_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`detail_id` INT NOT NULL,
	`address_id` INT NOT NULL,
	`ec_id` INT NOT NULL,
	`health_confition` VARCHAR(255),
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `address_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`street` VARCHAR(255) NOT NULL,
	`brgy` VARCHAR(255) NOT NULL,
	`city` VARCHAR(255) NOT NULL,
	`province` VARCHAR(255) NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `emergency_contact_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`first_name` VARCHAR(255) NOT NULL,
	`last_name` VARCHAR(255) NOT NULL,
	`relationship` VARCHAR(255) NOT NULL,
	`phone_number` VARCHAR(11) NOT NULL,
	`ctime` TIMESTAMP NOT NULL,
	`mtime` TIMESTAMP NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE `trainers_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`detail_id` INT NOT NULL,
	`address_id` INT NOT NULL,
	`ec_id` INT NOT NULL,
	`specialization` VARCHAR(255) NOT NULL,
	`certifications` VARCHAR(255) NOT NULL,
	`experience_years` INT NOT NULL,
	`hire_date` VARCHAR(255) NOT NULL,
	`availability` VARCHAR(255) NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`trainer_status` ENUM("'active'", "'inactive'") NOT NULL DEFAULT 'active',
	PRIMARY KEY(`id`)
);

CREATE TABLE `details_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`first_name` VARCHAR(255) NOT NULL,
	`middle_name` VARCHAR(255) NOT NULL,
	`last_name` VARCHAR(255) NOT NULL,
	`phone_number` VARCHAR(11) NOT NULL,
	`email_address` VARCHAR(255) NOT NULL,
	`date_of_birth` DATE NOT NULL,
	`gender` ENUM("'male'", "'female'", "'other'") NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE `staff_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`detail_id` INT NOT NULL,
	`address_id` INT NOT NULL,
	`ec_id` INT NOT NULL,
	`role` ENUM("'receptionis'", "'cleaner'", "'encoder'", "maintenance", "attendant", "officer", "childcare", "dietitian", "consultant", "instructor", "manager") NOT NULL,
	`hire_date` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`shift_schedule` VARCHAR(255) NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`staff_status` ENUM("'active'", "'inactive'") NOT NULL DEFAULT 'active',
	PRIMARY KEY(`id`)
);

CREATE TABLE `admin_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`detail_id` INT NOT NULL,
	`address_id` INT NOT NULL,
	`role` ENUM("'super'", "'admin'", "'subadmin'") NOT NULL DEFAULT 'admin',
	`permission_level` SMALLINT NOT NULL DEFAULT 1,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `schedules_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`class_name` VARCHAR(255) NOT NULL,
	`trainer_id` INT NOT NULL,
	`start_time` TIME NOT NULL,
	`end_time` TIME NOT NULL,
	`days_of_week` VARCHAR(255) NOT NULL,
	`location` VARCHAR(255) NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `attendance_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`member_id` INT NOT NULL,
	`class_id` INT NOT NULL,
	`attendance_date` DATE NOT NULL,
	`attendance_status` ENUM("'absent'", "'late'", "'present'", "'early'") NOT NULL DEFAULT 'present',
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `payments_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`member_id` INT NOT NULL,
	`amount` DECIMAL(100000,2) NOT NULL,
	`payment_date` DATE NOT NULL,
	`payment_method` ENUM("'cash'", "'card'", "'ecash'") NOT NULL DEFAULT 'cash',
	`package_id` INT NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`matime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `package_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`package_name` VARCHAR(255) NOT NULL,
	`duration_months` DATETIME NOT NULL,
	`price` DECIMAL(100000, 2) NOT NULL,
	`benefits` VARCHAR(255) NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

ALTER TABLE `address_table`
ADD FOREIGN KEY(`id`) REFERENCES `member_table`(`address_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `details_table`
ADD FOREIGN KEY(`id`) REFERENCES `member_table`(`detail_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `trainers_table`
ADD FOREIGN KEY(`address_id`) REFERENCES `address_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `trainers_table`
ADD FOREIGN KEY(`detail_id`) REFERENCES `details_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `emergency_contact_table`
ADD FOREIGN KEY(`id`) REFERENCES `member_table`(`ec_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `emergency_contact_table`
ADD FOREIGN KEY(`id`) REFERENCES `trainers_table`(`ec_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `schedules_table`
ADD FOREIGN KEY(`trainer_id`) REFERENCES `trainers_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `staff_table`
ADD FOREIGN KEY(`detail_id`) REFERENCES `details_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `staff_table`
ADD FOREIGN KEY(`address_id`) REFERENCES `address_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `staff_table`
ADD FOREIGN KEY(`ec_id`) REFERENCES `emergency_contact_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `admin_table`
ADD FOREIGN KEY(`detail_id`) REFERENCES `details_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `admin_table`
ADD FOREIGN KEY(`address_id`) REFERENCES `address_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `schedules_table`
ADD FOREIGN KEY(`id`) REFERENCES `attendance_table`(`class_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `attendance_table`
ADD FOREIGN KEY(`member_id`) REFERENCES `member_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `payments_table`
ADD FOREIGN KEY(`member_id`) REFERENCES `member_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `package_table`
ADD FOREIGN KEY(`id`) REFERENCES `payments_table`(`package_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;