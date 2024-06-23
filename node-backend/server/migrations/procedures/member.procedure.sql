-- Add member
DELIMITER //

CREATE OR REPLACE PROCEDURE add_member(
    IN p_first_name VARCHAR(255),
    IN p_middle_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_phone_number VARCHAR(13),
    IN p_email_address VARCHAR(255),
    IN p_date_of_birth DATE,
    IN p_gender ENUM('male', 'female', 'other'),
    IN p_street VARCHAR(255),
    IN p_brgy VARCHAR(255),
    IN p_city VARCHAR(255),
    IN p_province VARCHAR(255),
    IN p_ec_first_name VARCHAR(255),
    IN p_ec_last_name VARCHAR(255),
    IN p_relationship VARCHAR(255),
    IN p_ec_phone_number VARCHAR(13),
    IN p_package_id INT,
    IN p_health_condition VARCHAR(255),
    IN p_reference_no VARCHAR(255),
    IN p_purchased_id VARCHAR(255)
)
BEGIN
    DECLARE v_detail_id INT;
    DECLARE v_address_id INT;
    DECLARE v_ec_id INT;
    DECLARE v_member_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        DECLARE sql_state CHAR(5);
        DECLARE error_message TEXT;
        DECLARE error_code INT;
        
        GET DIAGNOSTICS CONDITION 1
            sql_state = RETURNED_SQLSTATE,
            error_message = MESSAGE_TEXT,
            error_code = MYSQL_ERRNO;
        
        ROLLBACK;
        SELECT 'Error occurred during member create.' AS error_message, error_code AS err_status, error_message AS detailed_message;
    END;


    START TRANSACTION;

    -- Add details
    INSERT INTO details_table (first_name, middle_name, last_name, phone_number, email_address, date_of_birth, gender)
    VALUES (p_first_name, p_middle_name, p_last_name, p_phone_number, p_email_address, p_date_of_birth, p_gender);
    SET v_detail_id = LAST_INSERT_ID();

    -- Add address
    INSERT INTO address_table (street, brgy, city, province)
    VALUES (p_street, p_brgy, p_city, p_province);
    SET v_address_id = LAST_INSERT_ID();

    -- Add emergency contact
    INSERT INTO emergency_contact_table (first_name, last_name, relationship, phone_number)
    VALUES (p_ec_first_name, p_ec_last_name, p_relationship, p_ec_phone_number);
    SET v_ec_id = LAST_INSERT_ID();

    -- Add member
    INSERT INTO member_table (detail_id, address_id, ec_id, package_id, health_condition)
    VALUES (v_detail_id, v_address_id, v_ec_id, p_package_id, p_health_condition);
    SET v_member_id = LAST_INSERT_ID();

    CALL add_purchased_package(p_package_id,v_member_id,p_reference_no,p_purchased_id);

    SELECT v_member_id AS member_id;
   
   	COMMIT;
END //

DELIMITER ;

-- Update member
DELIMITER //

CREATE PROCEDURE update_member(
    IN p_member_id INT,
    IN p_first_name VARCHAR(255),
    IN p_middle_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_phone_number VARCHAR(13),
    IN p_email_address VARCHAR(255),
    IN p_date_of_birth DATE,
    IN p_gender ENUM('male', 'female', 'other'),
    IN p_street VARCHAR(255),
    IN p_brgy VARCHAR(255),
    IN p_city VARCHAR(255),
    IN p_province VARCHAR(255),
    IN p_ec_first_name VARCHAR(255),
    IN p_ec_last_name VARCHAR(255),
    IN p_relationship VARCHAR(255),
    IN p_ec_phone_number VARCHAR(13),
    IN p_package_id INT,
    IN p_health_condition VARCHAR(255)
)
BEGIN
    DECLARE v_detail_id INT;
    DECLARE v_address_id INT;
    DECLARE v_ec_id INT;
   	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred during schedule update.' AS error_message, 500 AS err_status;
    END;

    START TRANSACTION;

    -- Update details
    UPDATE details_table
    SET first_name = p_first_name,
        middle_name = p_middle_name,
        last_name = p_last_name,
        phone_number = p_phone_number,
        email_address = p_email_address,
        date_of_birth = p_date_of_birth,
        gender = p_gender
    WHERE id = (SELECT detail_id FROM member_table WHERE id = p_member_id);

    -- Update address
    UPDATE address_table
    SET street = p_street,
        brgy = p_brgy,
        city = p_city,
        province = p_province
    WHERE id = (SELECT address_id FROM member_table WHERE id = p_member_id);

    -- Update emergency contact
    UPDATE emergency_contact_table
    SET first_name = p_ec_first_name,
        last_name = p_ec_last_name,
        relationship = p_relationship,
        phone_number = p_ec_phone_number
    WHERE id = (SELECT ec_id FROM member_table WHERE id = p_member_id);

    -- Update member
    UPDATE member_table
    SET package_id = p_package_id,
        health_confition = p_health_condition
    WHERE id = p_member_id;
   
   	COMMIT;
END //

DELIMITER ;

-- Delete member
DELIMITER //

CREATE PROCEDURE delete_member(
    IN p_member_id INT
)
BEGIN
    DELETE FROM member_table WHERE id = p_member_id;
END //

DELIMITER ;

-- Get member
DELIMITER //

CREATE PROCEDURE get_member(
    IN p_member_id INT
)
BEGIN
	IF p_member_id = 0 THEN
    	SELECT * FROM member_details_view ORDER BY member_created_time DESC;
    ELSE
    	SELECT * FROM member_details_view WHERE member_id = p_member_id;
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE add_purchased_package (
  IN p_package_id INT,
  IN p_member_id INT,
  IN p_reference_no VARCHAR(255),
  IN p_purchased_id VARCHAR(255)
)

BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        DECLARE sql_state CHAR(5);
        DECLARE error_message TEXT;
        DECLARE error_code INT;
        
        GET DIAGNOSTICS CONDITION 1
            sql_state = RETURNED_SQLSTATE,
            error_message = MESSAGE_TEXT,
            error_code = MYSQL_ERRNO;
        
        ROLLBACK;
        SELECT 'Error occurred during purchased_package create.' AS error_message, error_code AS err_status, error_message AS detailed_message;
    END;

    START TRANSACTION;

    INSERT INTO purchased_package_table (package_id,member_id,reference_number,purchased_id) VALUES (p_package_id,p_member_id,p_reference_no,p_purchased_id);

    COMMIT;

END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE get_purchased_package (
  IN p_id INT
)

BEGIN
  IF p_id = 0 THEN
    SELECT * FROM member_purchased_package;
  ELSE
    SELECT * FROM member_purchased_package WHERE id = p_id;
  END IF;
END //

DELIMITER ;
