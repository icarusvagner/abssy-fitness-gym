
DELIMITER //

CREATE OR REPLACE PROCEDURE create_package(
    IN p_package_name VARCHAR(255),
    IN p_duration INT,
    IN p_package_type ENUM('day', 'days', 'week','month','year', 'weeks', 'months', 'years'),
    IN p_price DECIMAL(10, 2),
    IN p_benefits VARCHAR(255)
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
	    SELECT 'Error occurred during package create.' AS error_message, error_code AS err_status, error_message AS detailed_message;
	END;

    START TRANSACTION;

    INSERT INTO package_table (package_name, duration, package_type, price, benefits)
    VALUES (p_package_name, p_duration, p_package_type, p_price, p_benefits);

    COMMIT;

    SELECT LAST_INSERT_ID() AS package_id, 'Package created successfully.' AS success_message, 201 AS status;
END //

DELIMITER ;


DELIMITER //

CREATE OR REPLACE PROCEDURE read_package(
    IN p_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- ROLLBACK;
        SELECT 'Error occurred during package retrieval.' AS error_message, 500 AS status;
    END;

    START TRANSACTION;

   	IF p_id = 0 THEN
   		SELECT * FROM package_table ORDER BY ctime DESC;
	ELSE
    	SELECT * FROM package_table WHERE id = p_id;
	END IF;

    COMMIT;
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE update_package(
    IN p_id INT,
    IN p_package_name VARCHAR(255),
    IN p_duration INT,
    IN p_package_type ENUM('day', 'days', 'week','month','year', 'weeks', 'months', 'years'),
    IN p_price DECIMAL(10, 2),
    IN p_benefits VARCHAR(255),
    IN p_pack_stats ENUM('active','inactive','removed')
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
	    SELECT 'Error occurred during package update.' AS error_message, error_code AS err_status, error_message AS detailed_message;
	END;

    START TRANSACTION;

    UPDATE package_table
    SET package_name = p_package_name,
        duration = p_duration,
        package_type = p_package_type,
        price = p_price,
        benefits = p_benefits,
        status = p_pack_stats,
        mtime = CURRENT_TIMESTAMP
    WHERE id = p_id;

    COMMIT;

    SELECT ROW_COUNT() AS affected_rows, 'Package updated successfully.' AS success_message, 200 AS status;
END //

DELIMITER ;


DELIMITER //

CREATE OR REPLACE PROCEDURE delete_package(
    IN p_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred during package deletion.' AS error_message, 500 AS status;
    END;

    START TRANSACTION;

    UPDATE gym_db.package_table SET status='removed', mtime=current_timestamp() WHERE id=p_id;

    COMMIT;

    SELECT ROW_COUNT() AS affected_rows, 'Package deleted successfully.' AS success_message, 200 AS status;
END //

DELIMITER ;
