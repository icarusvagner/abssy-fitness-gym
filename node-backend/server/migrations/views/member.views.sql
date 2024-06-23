CREATE OR REPLACE VIEW member_details_view AS
SELECT m.id AS member_id, 
    d.first_name, 
    d.middle_name, 
    d.last_name, 
    d.phone_number, 
    d.email_address, 
    DATE_FORMAT(`d`.`date_of_birth`, '%Y-%m-%d') AS date_of_birth,
    d.gender, 
    a.street AS address_street, 
    a.brgy AS address_brgy, 
    a.city AS address_city, 
    a.province AS address_province, 
    ec.first_name AS ec_first_name, 
    ec.last_name AS ec_last_name, 
    ec.relationship AS ec_relationship, 
    ec.phone_number AS ec_phone_number, 
    m.package_id, 
    m.health_condition,
    m.member_status,
    DATE_FORMAT(`m`.`ctime`, '%Y-%m-%d') AS member_created_time
FROM member_table m
INNER JOIN details_table d ON m.detail_id = d.id
INNER JOIN address_table a ON m.address_id = a.id
INNER JOIN emergency_contact_table ec ON m.ec_id = ec.id;

CREATE OR REPLACE VIEW member_purchased_package AS
SELECT ppt.id,
  CONCAT(mdv.last_name, ', ', mdv.first_name, ' ', mdv.middle_name) AS fullname,
  mdv.phone_number,
  mdv.email_address,
  pack.package_name,
  pack.price,
  ppt.reference_number,
  ppt.purchased_id,
  DATE_FORMAT(ppt.ctime, '%Y-%m-%d') AS date_added
FROM
  member_details_view mdv
RIGHT JOIN
  purchased_package_table ppt ON ppt.member_id = mdv.member_id
INNER JOIN
  package_table pack ON pack.id = mdv.package_id
ORDER BY ppt.ctime DESC;
