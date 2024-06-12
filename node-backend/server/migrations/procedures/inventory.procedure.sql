-- insert into the inventory
DELIMITER //

CREATE OR REPLACE PROCEDURE insert_inventory(
  IN p_brand_name VARCHAR(255),
  IN p_classification VARCHAR(255),
  IN p_base_count INT,
  IN p_type ENUM('supplement','equipment')
)

BEGIN
  DECLARE v_inventory_id INT;
  DECLARE v_item_id INT;

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
      SELECT 'Error occurred during inventory insert.' AS error_message, error_code AS err_status, error_message AS detailed_message;
  END;

  START TRANSACTION;
 
  IF p_type = 'supplement' THEN
    SELECT id, inventory_id INTO v_item_id, v_inventory_id FROM supplement_table WHERE supplement_name = p_brand_name AND classification = p_classification LIMIT 1;

    IF v_item_id IS NULL THEN

      INSERT INTO inventory_table (base_count, total_count) VALUES(p_base_count, p_base_count);
      SET v_inventory_id = LAST_INSERT_ID();

      INSERT INTO supplement_table (inventory_id, supplement_name, classification) VALUES (v_inventory_id, p_brand_name, p_classification);

      INSERT INTO inventory_log_table (inventory_id, count_added, classification_type, log_state) VALUES (v_inventory_id, p_base_count, 'supplement', 'added');
    ELSE
      CALL update_inventory(v_inventory_id, p_base_count, 'add', 'supplement');
    END IF;
  ELSE
    SELECT id, inventory_id INTO v_item_id, v_inventory_id FROM equipment_table WHERE brand_name = p_brand_name AND equipment_type = p_classification LIMIT 1;

    IF v_item_id IS NULL THEN
      INSERT INTO inventory_table (base_count, total_count) VALUES(p_base_count, p_base_count);
      SET v_inventory_id = LAST_INSERT_ID();

      INSERT INTO equipment_table (inventory_id, brand_name, equipment_type) VALUES (v_inventory_id, p_brand_name, p_classification);

      INSERT INTO inventory_log_table (inventory_id, count_added, classification_type, log_state) VALUES (v_inventory_id, p_base_count, 'equipment', 'added');
    ELSE
      CALL update_inventory(v_inventory_id, p_base_count, 'add', 'equipment');
    END IF;
  END IF;

  COMMIT;
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE select_inventory(
  IN p_id INT,
  IN p_type ENUM('equipment','supplement')
)

BEGIN
  IF p_id = 0 THEN
    SELECT * FROM inventory_view WHERE category = p_type ORDER BY inventory_id DESC;
  ELSE
    SELECT * FROM inventory_view WHERE category = p_type AND inventory_id = p_id;
  END IF;
END //

DELIMITER ;

-- Update inventory for equipment and supplement
DELIMITER //

CREATE OR REPLACE PROCEDURE update_inventory(
  IN p_inventory_id INT,
  IN p_quantity INT,
  IN p_type ENUM('add', 'minus'),
  IN p_classification ENUM('supplement', 'equipment')
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
      SELECT 'Error occurred during inventory update.' AS error_message, error_code AS err_status, error_message AS detailed_message;
  END;

  START TRANSACTION;

  IF p_type = 'add' THEN
    UPDATE inventory_table it
    SET it.base_count = it.base_count + p_quantity,
        it.total_count = CASE
                        WHEN it.base_count <= it.total_count THEN it.total_count
                        ELSE it.total_count + p_quantity
                      END,
        it.mtime = current_timestamp()
    WHERE
      id = p_inventory_id;

    INSERT INTO inventory_log_table (inventory_id, count_added, classification_type, log_state) VALUES (p_inventory_id, p_quantity, p_classification, 'added');
  ELSE
    IF (SELECT base_count FROM inventory_table WHERE id = p_inventory_id > 0) THEN
      UPDATE inventory_table it SET it.base_count = it.base_count - p_quantity, mtime = current_timestamp() WHERE id = p_inventory_id;

      INSERT INTO inventory_log_table (inventory_id, count_added, classification_type, log_state) VALUES (p_inventory_id, p_quantity, p_classification, 'deducted');
    END IF;
  END IF;

  COMMIT;
END //

DELIMITER ;
