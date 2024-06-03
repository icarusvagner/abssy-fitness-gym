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
    m.health_condition
FROM member_table m
INNER JOIN details_table d ON m.detail_id = d.id
INNER JOIN address_table a ON m.address_id = a.id
INNER JOIN emergency_contact_table ec ON m.ec_id = ec.id;
