CREATE OR REPLACE VIEW inventory_view AS
SELECT
    i.id AS inventory_id,
    i.base_count,
    i.total_count,
    DATE_FORMAT(i.ctime, '%Y-%m-%d') AS ctime,
    DATE_FORMAT(i.mtime, '%Y-%m-%d') AS mtime,
    'equipment' AS category,
    e.id AS item_id,
    e.brand_name AS item_name,
    e.equipment_type AS item_type
FROM
    inventory_table i
JOIN
    equipment_table e ON i.id = e.inventory_id

UNION ALL

SELECT
    i.id AS inventory_id,
    i.base_count,
    i.total_count,
    DATE_FORMAT(i.ctime, '%Y-%m-%d') AS ctime,
    DATE_FORMAT(i.mtime, '%Y-%m-%d') AS mtime,
    'supplement' AS category,
    s.id AS item_id,
    s.supplement_name AS item_name,
    s.classification AS item_type
FROM
    inventory_table i
JOIN
    supplement_table s ON i.id = s.inventory_id;


CREATE OR REPLACE VIEW inventory_log_view AS
SELECT
  st.supplement_name AS item_name,
  st.classification AS item_type,
  ilt.classification_type,
  ilt.count_added,
  ilt.log_state,
  DATE_FORMAT(ilt.ctime, '%Y-%m-%d') as date_added
FROM
  inventory_log_table AS ilt
JOIN
  supplement_table AS st ON st.inventory_id = ilt.inventory_id

UNION ALL

SELECT
  et.brand_name,
  et.equipment_type,
  ilt.classification_type,
  ilt.count_added,
  ilt.log_state,
  DATE_FORMAT(ilt.ctime, '%Y-%m-%d') as date_added
FROM
  inventory_log_table AS ilt
JOIN
  equipment_table AS et ON et.inventory_id = ilt.inventory_id;
