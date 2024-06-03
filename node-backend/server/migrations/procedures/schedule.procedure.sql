DELIMITER //

CREATE PROCEDURE delete_schedule(
    IN p_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
      ROLLBACK;
      SELECT 'Error occurred during schedule creation.' AS error_message, 500 AS status;
    END;

    START TRANSACTION;

    DELETE FROM schedules_table WHERE id = p_id;

    COMMIT;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE update_schedule(
    IN p_id INT,
    IN p_class_name VARCHAR(255),
    IN p_trainer_id INT,
    IN p_start_time TIME,
    IN p_end_time TIME,
    IN p_days_of_week VARCHAR(255),
    IN p_location VARCHAR(255),
    IN p_status ENUM('available', 'unavailable')
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback transaction in case of an error
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE schedules_table
    SET class_name = p_class_name,
        trainer_id = p_trainer_id,
        start_time = p_start_time,
        end_time = p_end_time,
        days_of_week = p_days_of_week,
        location = p_location,
        status = p_status,
        mtime = CURRENT_TIMESTAMP
    WHERE id = p_id;

    COMMIT;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE get_schedule(
    IN p_id INT
)
BEGIN
    SELECT * FROM schedules_table WHERE id = p_id;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE add_schedule(
    IN p_class_name VARCHAR(255),
    IN p_trainer_id INT,
    IN p_start_time TIME,
    IN p_end_time TIME,
    IN p_days_of_week VARCHAR(255),
    IN p_location VARCHAR(255),
    IN p_status ENUM('available', 'unavailable')
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback transaction in case of an error
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO schedules_table (class_name, trainer_id, start_time, end_time, days_of_week, location, status)
    VALUES (p_class_name, p_trainer_id, p_start_time, p_end_time, p_days_of_week, p_location, p_status);

    COMMIT;
END //

DELIMITER ;
