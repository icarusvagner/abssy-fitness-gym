-- Create trainer
DELIMITER //

CREATE OR REPLACE PROCEDURE create_trainer(
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
    IN p_ec_relationship VARCHAR(255),
    IN p_ec_phone_number VARCHAR(11),
    IN p_specialization VARCHAR(255),
    IN p_certifications VARCHAR(255),
    IN p_experience_years INT,
    IN p_hire_date DATE,
    IN p_availability VARCHAR(255)
)
BEGIN
    DECLARE v_detail_id INT;
    DECLARE v_address_id INT;
    DECLARE v_ec_id INT;

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
        SELECT 'Error occurred during trainer create.' AS error_message, error_code AS err_status, error_message AS detailed_message;
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Insert into details_table
    INSERT INTO details_table (first_name, middle_name, last_name, phone_number, email_address, date_of_birth, gender)
    VALUES (p_first_name, p_middle_name, p_last_name, p_phone_number, p_email_address, p_date_of_birth, p_gender);
    SET v_detail_id = LAST_INSERT_ID();

    -- Insert into address_table
    INSERT INTO address_table (street, brgy, city, province)
    VALUES (p_street, p_brgy, p_city, p_province);
    SET v_address_id = LAST_INSERT_ID();

    -- Insert into emergency_contact_table
    INSERT INTO emergency_contact_table (first_name, last_name, relationship, phone_number)
    VALUES (p_ec_first_name, p_ec_last_name, p_ec_relationship, p_ec_phone_number);
    SET v_ec_id = LAST_INSERT_ID();

    -- Insert into trainers_table
    INSERT INTO trainers_table (detail_id, address_id, ec_id, specialization, certifications, experience_years, hire_date, availability)
    VALUES (v_detail_id, v_address_id, v_ec_id, p_specialization, p_certifications, p_experience_years, p_hire_date, p_availability);

    -- Commit the transaction
    COMMIT;
END //

DELIMITER ;

-- Read trainers
DELIMITER //

CREATE OR REPLACE PROCEDURE read_trainer(
    IN p_id INT
)
BEGIN
    START TRANSACTION;

    IF p_id = 0 THEN
      SELECT * FROM trainers_details_view ORDER BY ctime DESC;
    ELSE
      SELECT * FROM trainers_details_view WHERE trainer_id = p_id LIMIT 1;
    END IF;

    COMMIT;
END //

DELIMITER ;

-- Update trainer
DELIMITER //

CREATE OR REPLACE PROCEDURE update_trainer(
    IN p_trainer_id INT,
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
    IN p_ec_relationship VARCHAR(255),
    IN p_ec_phone_number VARCHAR(13),
    IN p_specialization VARCHAR(255),
    IN p_certifications VARCHAR(255),
    IN p_experience_years INT,
    IN p_hire_date DATE,
    IN p_availability VARCHAR(255),
    IN p_trainer_status ENUM('active', 'inactive', 'removed')
)
BEGIN
    DECLARE v_detail_id INT;
    DECLARE v_address_id INT;
    DECLARE v_ec_id INT;

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
        SELECT 'Error occurred during trainer update.' AS error_message, error_code AS err_status, error_message AS detailed_message;
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Get the associated IDs for the trainer
    SELECT detail_id, address_id, ec_id INTO v_detail_id, v_address_id, v_ec_id
    FROM trainers_table
    WHERE id = p_trainer_id;

    -- Update details_table
    UPDATE details_table
    SET first_name = p_first_name, middle_name = p_middle_name, last_name = p_last_name,
        phone_number = p_phone_number, email_address = p_email_address,
        date_of_birth = p_date_of_birth, gender = p_gender
    WHERE id = v_detail_id;

    -- Update address_table
    UPDATE address_table
    SET street = p_street, brgy = p_brgy, city = p_city, province = p_province
    WHERE id = v_address_id;

    -- Update emergency_contact_table
    UPDATE emergency_contact_table
    SET first_name = p_ec_first_name, last_name = p_ec_last_name, relationship = p_ec_relationship,
        phone_number = p_ec_phone_number
    WHERE id = v_ec_id;

    -- Update trainers_table
    UPDATE trainers_table
    SET specialization = p_specialization, certifications = p_certifications,
        experience_years = p_experience_years, hire_date = p_hire_date,
        availability = p_availability, trainer_status = p_trainer_status
    WHERE id = p_trainer_id;

    -- Commit the transaction
    COMMIT;
END //

DELIMITER ;

-- Delete trainer
DELIMITER //

CREATE OR REPLACE PROCEDURE delete_trainer(
    IN p_id INT
)
BEGIN
    START TRANSACTION;

    UPDATE trainers_table SET trainer_status = 'removed' WHERE id = p_id;

    COMMIT;
END //

DELIMITER ;
