DELIMITER //

CREATE OR PROCEDULE sales_insert(
    IN p_pack_id INT,
    IN p_amount DECIMAL(10, 2),
    IN p_trans_id VARCHAR(255),
    IN p_ref_no VARCHAR(255),
    IN p_acc_name VARCHAR(255),
    IN p_email_add VARCHAR(255),
    IN p_phone_number VARCHAR(13),
    IN p_desc VARCHAR(255),
    IN p_date_paid DATETIME,
    IN p_stat VARCHAR(25)
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
   	    SELECT 'Error occurred during sales create.' AS error_message, error_code AS err_status, error_message AS detailed_message;
   	END;

    START TRANSACTION;

    INSERT INTO gym_db.sales_table
    (package_id, amount, trans_id, ref_no, acc_name, email_add, phone_number, description, date_paid, stat)
    VALUES (p_pack_id, p_amount, p_trans_id, p_ref_no, p_email_add, p_phone_number, p_desc, p_date_paid, p_stat);

    SELECT 'Sales added' AS message, 201 AS status;

    COMMIT;

END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE get_sales_report(
    IN p_sales_id INT
)

BEGIN
    IF p_sales_id = 0 THEN
        SELECT * FROM sales_report_view;
    ELSE
        SELECT * FROM sales_report_view WHERE sales_id = p_sales_id;
    END IF;
END //

DELIMITER ;
