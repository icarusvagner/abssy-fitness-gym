-- Create payment
DELIMITER //

CREATE OR REPLACE PROCEDURE create_payment(
    IN p_member_id INT,
    IN p_amount DECIMAL(10,2),
    IN p_payment_date DATE,
    IN p_payment_method ENUM('cash', 'card', 'ecash'),
    IN p_package_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
      ROLLBACK;
      SELECT 'Error occurred during payment update.' AS error_message, 500 AS err_status;
    END;

    -- Start the transaction
    START TRANSACTION;

    INSERT INTO payments_table (member_id, amount, payment_date, payment_method, package_id)
    VALUES (p_member_id, p_amount, p_payment_date, p_payment_method, p_package_id);

    COMMIT;
END //

DELIMITER ;

-- update payment
DELIMITER //

CREATE OR REPLACE PROCEDURE update_payment(
    IN p_payment_id INT,
    IN p_amount DECIMAL(10,2),
    IN p_payment_date DATE,
	IN p_payment_status ENUM('active','late','early','removed'),
    IN p_package_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
      ROLLBACK;
      SELECT 'Error occurred during payment update.' AS error_message, 500 AS err_status;
    END;

    -- Start the transaction
    START TRANSACTION;

    UPDATE payments_table
    SET 
        amount = p_amount,
        payment_date = p_payment_date,
        payment_method = p_payment_method,
        payment_status = p_payment_status,
        package_id = p_package_id
    WHERE id = p_payment_id;

    COMMIT;
END //

DELIMITER ;

-- Delete payment
DELIMITER //

CREATE OR REPLACE PROCEDURE delete_payment(
    IN p_payment_id INT
)
BEGIN
  START TRANSACTION;

  UPDATE payments_table SET payment_status = 'removed' WHERE id = p_payment_id;

  COMMIT;
END //

DELIMITER ;

-- Read member payment
DELIMITER //

CREATE OR REPLACE PROCEDURE read_payment_member(
    IN p_id INT
)
BEGIN
    -- Start the transaction
    START TRANSACTION;

	IF p_id = 0 THEN
		SELECT * FROM member_payment_view ORDER BY ctime DESC;
	ELSE
		SELECT * FROM member_payment_view WHERE payment_id = p_id LIMIT 1;
	END IF;

    COMMIT;
END //

DELIMITER ;
