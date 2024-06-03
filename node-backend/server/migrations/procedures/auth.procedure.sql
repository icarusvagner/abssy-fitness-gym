-- Registration for staff
DELIMITER //

CREATE OR REPLACE PROCEDURE register_staff(
    IN p_first_name VARCHAR(255),
    IN p_middle_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_phone_number VARCHAR(11),
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
    IN p_ec_phone_number VARCHAR(11),
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_role ENUM('receptionis', 'cleaner', 'encoder', 'maintenance', 'attendant', 'officer', 'childcare', 'dietitian', 'consultant', 'instructor', 'manager'),
    IN p_shift_schedule VARCHAR(255)
)
BEGIN
    DECLARE detail_id INT;
    DECLARE address_id INT;
    DECLARE ec_id INT;
    DECLARE login_id INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Rollback any changes if an error occurs
        ROLLBACK;
        -- Signal the error to the calling application
        RESIGNAL;
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Insert into details_table
    INSERT INTO details_table (first_name, middle_name, last_name, phone_number, email_address, date_of_birth, gender)
    VALUES (p_first_name, p_middle_name, p_last_name, p_phone_number, p_email_address, p_date_of_birth, p_gender);
    SET detail_id = LAST_INSERT_ID();

    -- Insert into address_table
    INSERT INTO address_table (street, brgy, city, province)
    VALUES (p_street, p_brgy, p_city, p_province);
    SET address_id = LAST_INSERT_ID();

    -- Insert into emergency_contact_table
    INSERT INTO emergency_contact_table (first_name, last_name, relationship, phone_number)
    VALUES (p_ec_first_name, p_ec_last_name, p_relationship, p_ec_phone_number);
    SET ec_id = LAST_INSERT_ID();

    -- Insert into login_details
    INSERT INTO login_details (username, password)
    VALUES (p_username, p_password);
    SET login_id = LAST_INSERT_ID();

    -- Insert into staff_table
    INSERT INTO staff_table (detail_id, address_id, ec_id, role, shift_schedule, login_id)
    VALUES (detail_id, address_id, ec_id, p_role, p_shift_schedule, login_id);

    -- Commit the transaction
    COMMIT;
END //

DELIMITER ;



-- Registration for admin
DELIMITER //

CREATE OR REPLACE PROCEDURE `register_admin`(
    IN p_first_name VARCHAR(255),
    IN p_middle_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_phone_number VARCHAR(11),
    IN p_email_address VARCHAR(255),
    IN p_date_of_birth DATE,
    IN p_gender ENUM('male', 'female', 'other'),
    IN p_street VARCHAR(255),
    IN p_brgy VARCHAR(255),
    IN p_city VARCHAR(255),
    IN p_province VARCHAR(255),
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_role ENUM('super', 'admin', 'subadmin'),
    IN p_permission_level SMALLINT
)
BEGIN
    DECLARE detail_id INT;
    DECLARE address_id INT;
    DECLARE login_id INT;
    DECLARE exit handler for sqlexception 
    BEGIN
        -- Rollback any changes if an error occurs
        ROLLBACK;
        -- Signal the error to the calling application
        RESIGNAL;
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Insert into details_table
    INSERT INTO details_table (first_name, middle_name, last_name, phone_number, email_address, date_of_birth, gender)
    VALUES (p_first_name, p_middle_name, p_last_name, p_phone_number, p_email_address, p_date_of_birth, p_gender);
    SET detail_id = LAST_INSERT_ID();

    -- Insert into address_table
    INSERT INTO address_table (street, brgy, city, province)
    VALUES (p_street, p_brgy, p_city, p_province);
    SET address_id = LAST_INSERT_ID();

    -- Insert into login_details
    INSERT INTO login_details (username, password)
    VALUES (p_username, p_password);
    SET login_id = LAST_INSERT_ID();

    -- Insert into admin_table
    INSERT INTO admin_table (detail_id, address_id, role, permission_level, login_id)
    VALUES (detail_id, address_id, p_role, p_permission_level, login_id);

    -- Commit the transaction
    COMMIT;
END //

DELIMITER ;


-- Login user procedure for both admin and staff
DELIMITER //

CREATE OR REPLACE PROCEDURE `login_user`(
    IN p_username VARCHAR(255)
)
BEGIN
    DECLARE login_id INT;
    DECLARE user_exists BOOLEAN DEFAULT FALSE;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Handle any SQL exceptions
        SELECT 'An error occurred during login process' AS message, 500 AS status;
    END;

    -- Check if the username exists in login_details
    SELECT id INTO login_id
    FROM login_details
    WHERE username = p_username
    LIMIT 1;

    IF login_id IS NULL OR login_id = 0 THEN
        -- If login_id is NULL or 0, handle special case
        SELECT 
            ld.username, 
            ld.password, 
            'Super' AS role, 
            'Admin' AS user_type
        FROM 
            login_details ld
        WHERE 
            ld.id = 0

        UNION ALL

        SELECT 
            NULL AS username, 
            NULL AS password, 
            'Super' AS role, 
            'Admin' AS user_type
        WHERE 
            NOT EXISTS (SELECT 1 FROM login_details WHERE id = 0);
    ELSE
        -- Check if login_id is in staff_table
        SELECT COUNT(*) INTO user_exists
        FROM staff_table
        WHERE login_id = login_id;

        IF user_exists THEN
            -- If login_id is found in staff_table
            SELECT 
              ld.username,
              ld.password,
              st.role,
              'staff' AS user_type
            FROM
              staff_table st
            LEFT JOIN login_details ld ON ld.id =  st.login_id
            WHERE ld.id = login_id;
        ELSE
            -- Check if login_id is in admin_table
            SELECT COUNT(*) INTO user_exists
            FROM admin_table
            WHERE login_id = login_id;

            IF user_exists THEN
                -- If login_id is found in admin_table
               SELECT 
                ld.username,
                ld.password,
                at2.role,
                'admin' AS user_type
              FROM
                admin_table at2
              LEFT JOIN login_details ld ON ld.id = at2.login_id 
              WHERE ld.id = login_id;
            ELSE
                -- If login_id is not found in both staff_table and admin_table
                SELECT 'Account not found, user not registered' AS message, 404 AS status;
            END IF;
        END IF;
    END IF;
END //

DELIMITER ;

-- Stored procedure for changing user password
DELIMITER //

CREATE OR REPLACE PROCEDURE change_password(
    IN p_id INT,
    IN p_role ENUM('staff', 'admin'),
    IN p_new_password VARCHAR(255)
)
BEGIN
    DECLARE v_error_message VARCHAR(255) DEFAULT NULL;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Handle any SQL exceptions
        ROLLBACK;
        SELECT 'An error occurred while changing the password.' AS error_message, 500 AS status;
    END;

    -- Start transaction
    START TRANSACTION;

    IF p_role = 'staff' THEN
        -- Update password for staff
        UPDATE login_details ld
        INNER JOIN staff_table st ON ld.id = st.login_id
        SET ld.password = p_new_password
        WHERE st.id = p_id;
    ELSEIF p_role = 'admin' THEN
        -- Update password for admin
        UPDATE login_details ld
        INNER JOIN admin_table at ON ld.id = at.login_id
        SET ld.password = p_new_password
        WHERE at.id = p_id;
    ELSE
        SET v_error_message = 'Invalid role specified.';
    END IF;

    -- Check for errors
    IF v_error_message IS NOT NULL THEN
        -- Rollback transaction in case of invalid role
        ROLLBACK;
        SELECT v_error_message AS error_message, 403 AS status;
    ELSE
        -- Commit transaction if no errors
        COMMIT;
        SELECT 'Password changed successfully.' AS success_message, 201 AS status;
    END IF;
END //

DELIMITER ;

