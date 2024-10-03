CREATE OR REPLACE VIEW trainers_details_view AS
SELECT
    t.id AS trainer_id,
    d.first_name,
    d.middle_name,
    d.last_name,
    d.phone_number,
    d.email_address,
    DATE_FORMAT(d.date_of_birth, '%Y-%m-%d') AS date_of_birth,
    d.gender,
    a.street,
    a.brgy,
    a.city,
    a.province,
    e.first_name AS ec_first_name,
    e.last_name AS ec_last_name,
    e.relationship AS ec_relationship,
    e.phone_number AS ec_phone_number,
    t.specialization,
    t.certifications,
    t.experience_years,
    t.hire_date,
    t.availability,
    t.trainer_status,
    DATE_FORMAT(t.ctime, '%Y-%m-%d') AS ctime,
    DATE_FORMAT(t.mtime, '%Y-%m-%d') AS mtime
FROM
    trainers_table t
JOIN
    details_table d ON t.detail_id = d.id
JOIN
    address_table a ON t.address_id = a.id
JOIN
    emergency_contact_table e ON t.ec_id = e.id;
