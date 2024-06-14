DELIMITER //

CREATE OR REPLACE PROCEDURE update_sale(
  IN p_sale_id INT,
  IN p_package_id INT,
  IN p_member_id INT,
  IN p_price DECIMAL(10,2)
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
      SELECT 'Error occurred during sale update.' AS error_message, error_code AS err_status, error_message AS detailed_message;
  END;

  START TRANSACTION;

  UPDATE sales_table
  SET package_id = p_package_id,
      member_id = p_member_id,
      price = p_price,
      mtime = CURRENT_TIMESTAMP()
  WHERE id = p_sale_id;

  COMMIT;
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE add_sale(
  IN p_package_id INT,
  IN p_member_id INT,
  IN p_price DECIMAL(10,2)
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
      SELECT 'Error occurred during sale insertion.' AS error_message, error_code AS err_status, error_message AS detailed_message;
  END;

  START TRANSACTION;

  INSERT INTO sales_table (package_id, member_id, price)
  VALUES (p_package_id, p_member_id, p_price);

  COMMIT;
END //

DELIMITER ;
