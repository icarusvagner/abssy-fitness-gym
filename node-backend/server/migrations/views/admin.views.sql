CREATE OR REPLACE VIEW admin_details_view AS
SELECT ad.id AS admin_id, 
    dt.first_name, 
    dt.middle_name, 
    dt.last_name, 
    dt.phone_number, 
    dt.email_address, 
    DATE_FORMAT(`dt`.`date_of_birth`, '%Y-%m-%d') AS date_of_birth,
    dt.gender, 
    ad.role AS admin_role, 
    ad.permission_level
FROM admin_table ad
INNER JOIN details_table dt ON ad.detail_id = dt.id;
