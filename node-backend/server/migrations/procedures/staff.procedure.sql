-- Update staff
DELIMITER //

CREATE OR REPLACE PROCEDURE update_staff(
    IN p_staff_id INT,
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
    IN p_role ENUM('receptionist', 'cleaner', 'encoder', "maintenance", "attendant", "officer", "childcare", "dietitian", "consultant", "instructor", "manager"),
    IN p_shift_schedule VARCHAR(255)
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
      SELECT 'Error occurred during staff update.' AS error_message, error_code AS err_status, error_message AS detailed_message;
  END;

  START TRANSACTION;
  -- Assuming login_id is provided as parameter for login
  -- UPDATE login_details
  -- SET username = p_username, password = p_password
  -- WHERE id = (SELECT login_id FROM staff_table WHERE id = p_staff_id);

  -- Update details_table
  UPDATE details_table
  SET first_name = p_first_name,
      middle_name = p_middle_name,
      last_name = p_last_name,
      phone_number = p_phone_number,
      email_address = p_email_address,
      date_of_birth = p_date_of_birth,
      gender = p_gender
  WHERE id = (SELECT detail_id FROM staff_table WHERE id = p_staff_id);

  -- Update address_table
  UPDATE address_table
  SET street = p_street,
      brgy = p_brgy,
      city = p_city,
      province = p_province
  WHERE id = (SELECT address_id FROM staff_table WHERE id = p_staff_id);

  -- Update emergency_contact_table
  UPDATE emergency_contact_table
  SET first_name = p_ec_first_name,
      last_name = p_ec_last_name,
      relationship = p_relationship,
      phone_number = p_ec_phone_number
  WHERE id = (SELECT ec_id FROM staff_table WHERE id = p_staff_id);

  -- Update staff_table
  UPDATE staff_table
  SET role = p_role,
      shift_schedule = p_shift_schedule
  WHERE id = p_staff_id;

  COMMIT;
END //

DELIMITER ;

-- Delete staff
DELIMITER //

CREATE OR REPLACE PROCEDURE delete_staff(
    IN p_staff_id INT
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
      ROLLBACK;
      SELECT 'Error occurred during staff update.' AS error_message, 500 AS err_status;
  END;

  START TRANSACTION;

  UPDATE staff_table SET staff_status = 'removed' WHERE id = p_staff_id;
  -- Assuming related records in details_table, address_table, and emergency_contact_table
  -- will be automatically deleted due to foreign key constraints

  COMMIT;
END //

DELIMITER ;

-- Read staff
DELIMITER //

CREATE OR REPLACE PROCEDURE read_staff(
    IN p_staff_id INT
)
BEGIN
  IF p_staff_id = 0 THEN
    SELECT * FROM staff_details_view;
  ELSE
    SELECT * FROM staff_details_view WHERE id = p_staff_id;
  END IF;
END //

DELIMITER ;
