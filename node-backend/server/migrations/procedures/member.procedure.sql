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
    IN p_health_condition VARCHAR(255)
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

    SELECT v_member_id AS member_id;

   	COMMIT;
END //

DELIMITER ;

-- Update member
DELIMITER //

CREATE OR REPLACE PROCEDURE update_member(
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

CREATE OR REPLACE PROCEDURE delete_member(
    IN p_member_id INT
)
BEGIN
    DELETE FROM member_table WHERE id = p_member_id;
END //

DELIMITER ;

-- Get member
DELIMITER //

CREATE OR REPLACE PROCEDURE get_member(
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

DELIMITER //

CREATE OR REPLACE PROCEDURE update_member_status (
    IN p_email VARCHAR(255),
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_reference_no VARCHAR(255),
    IN p_purchased_id VARCHAR(255),
    IN p_package_id INT
)
BEGIN
    DECLARE m_id INT;
    DECLARE d_id INT;
    DECLARE l_id INT;
    DECLARE sql_state CHAR(5);
    DECLARE error_message TEXT;
    DECLARE error_code INT;

    -- Exit handler for exceptions
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            sql_state = RETURNED_SQLSTATE,
            error_message = MESSAGE_TEXT,
            error_code = MYSQL_ERRNO;

        -- Rollback transaction in case of an error
        ROLLBACK;
        SELECT 'Error occurred during update_member_status.' AS error_message,
                error_code AS err_status,
                error_message AS detailed_message;
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Get the id from details_table
    SELECT id INTO d_id FROM details_table WHERE email_address = p_email;

    -- Check if a valid id was found
    IF d_id IS NOT NULL THEN
        -- Get the member id from member_table
        SELECT id INTO m_id FROM member_table WHERE detail_id = d_id;

        IF m_id IS NOT NULL THEN
            INSERT INTO login_details (username, password) VALUES (p_username, p_password);
            SET l_id = LAST_INSERT_ID();

            -- Update the member status to 'active'
            UPDATE member_table
            SET member_status = 'active',
            login_id = l_id
            WHERE id = m_id;

            -- Update the email verified timestamp
            UPDATE details_table
            SET email_verified_at = CURRENT_TIMESTAMP()
            WHERE id = d_id;

            -- Call add_purchased_package procedure
            CALL add_purchased_package(p_package_id, m_id, p_reference_no, p_purchased_id);

            SELECT 'Success' AS message, 201 AS status;

            -- Commit the transaction
            COMMIT;
        ELSE
            -- If no member found, rollback
            ROLLBACK;
            SELECT 'No member found for the given detail_id.' AS error_message;
        END IF;
    ELSE
        -- If no details found, rollback
        ROLLBACK;
        SELECT 'No details found for the given email address.' AS error_message;
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE check_verified_email (
    IN p_email VARCHAR(255)
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
        SELECT 'Error occurred during update_status.' AS error_message, error_code AS err_status, error_message AS detailed_message;
    END;

    START TRANSACTION;

    SELECT email_verified_at FROM details_table WHERE email_address= p_email;

    COMMIT;
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE login_member(
    IN p_username VARCHAR(255)
)

BEGIN
    DECLARE m_id INT;
    DECLARE user_count INT;

    -- Error handling
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
        SELECT 'Error occurred during login_member procedure.' AS error_message, error_code AS err_status, error_message AS detailed_message;
    END;

    -- Check if the username exists
    SELECT COUNT(id) INTO user_count FROM login_details WHERE username = p_username;

    IF user_count > 0 THEN
        -- Username found, return the user details
        SELECT * FROM login_details WHERE username = p_username LIMIT 1;
    ELSE
        -- Username not found, return error message
        SELECT 'Username not registered' AS message, 404 AS status;
    END IF;

END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE after_login(
    IN p_username VARCHAR(255)
)

BEGIN
    DECLARE l_id INT;
    DECLARE m_id INT;
    DECLARE user_count INT;

    -- Error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        DECLARE sql_state CHAR(5);
        DECLARE error_message TEXT;
        DECLARE error_code INT;

        GET DIAGNOSTICS CONDITION 1
            sql_state = RETURNED_SQLSTATE,
            error_message = MESSAGE_TEXT,
            error_code = MYSQL_ERRNO;

        -- Since there are no transactional changes, no rollback is necessary
        SELECT 'Error occurred during after_login procedure.' AS error_message, error_code AS err_status, error_message AS detailed_message;
    END;

    -- Check if the user exists
    SELECT COUNT(id) INTO user_count FROM login_details WHERE username = p_username;

    IF user_count > 0 THEN
        -- Get the login id
        SELECT id INTO l_id FROM login_details WHERE username = p_username;

        -- Check if login id was found
        IF l_id IS NOT NULL THEN
            -- Get the member id using login id
            SELECT id INTO m_id FROM member_details WHERE login_id = l_id;

            -- Check if member id was found
            IF m_id IS NOT NULL THEN
                -- Call another procedure to get member details
                CALL get_member(m_id);
            ELSE
                -- Member not found
                SELECT 'Member not found for the given login id' AS message, 404 AS status;
            END IF;
        ELSE
            -- Login id not found
            SELECT 'Login ID not found' AS message, 404 AS status;
        END IF;
    ELSE
        -- Username not found, return error message
        SELECT 'Username not registered' AS message, 404 AS status;
    END IF;

END //

DELIMITER ;
