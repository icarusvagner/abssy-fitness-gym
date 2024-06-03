
-- View to consolidate trainers, their schedules, and enrolled members
CREATE OR REPLACE VIEW trainers_schedules_members_view AS
SELECT
    t.id AS trainer_id,
    td.first_name AS trainer_first_name,
    td.middle_name AS trainer_middle_name,
    td.last_name AS trainer_last_name,
    td.phone_number AS trainer_phone_number,
    td.email_address AS trainer_email_address,
    DATE_FORMAT(td.date_of_birth, '%Y-%m-%d') AS trainer_date_of_birth,
    td.gender AS trainer_gender,
    t.specialization,
    t.certifications,
    t.experience_years,
    t.hire_date,
    t.availability,
    t.trainer_status,
    t.ctime AS trainer_ctime,
    t.mtime AS trainer_mtime,
    s.id AS schedule_id,
    s.class_name,
    s.start_time,
    s.end_time,
    s.days_of_week,
    s.location,
    s.status AS schedule_status,
    s.ctime AS schedule_ctime,
    s.mtime AS schedule_mtime,
    m.id AS member_id,
    md.first_name AS member_first_name,
    md.middle_name AS member_middle_name,
    md.last_name AS member_last_name,
    md.phone_number AS member_phone_number,
    md.email_address AS member_email_address,
    DATE_FORMAT(md.date_of_birth, '%Y-%m-%d') AS member_date_of_birth,
    md.gender AS member_gender,
    m.health_condition,
    m.ctime AS member_ctime,
    m.mtime AS member_mtime
FROM
    trainers_table t
    JOIN details_table td ON t.detail_id = td.id
    JOIN schedules_table s ON t.id = s.trainer_id
    JOIN member_table m ON m.package_id = s.id  -- Assuming package_id links to schedules_table
    JOIN details_table md ON m.detail_id = md.id;


CREATE OR REPLACE VIEW trainer_schedules_pivot_view AS
SELECT
    t.id AS trainer_id,
    td.first_name AS trainer_first_name,
    td.middle_name AS trainer_middle_name,
    td.last_name AS trainer_last_name,
    td.phone_number AS trainer_phone_number,
    td.email_address AS trainer_email_address,
    DATE_FORMAT(td.date_of_birth, '%Y-%m-%d') AS trainer_date_of_birth,
    td.gender AS trainer_gender,
    t.specialization,
    t.certifications,
    t.experience_years,
    t.hire_date,
    t.availability,
    t.trainer_status,
    t.ctime AS trainer_ctime,
    t.mtime AS trainer_mtime,
    s.id AS schedule_id,
    s.class_name,
    s.start_time,
    s.end_time,
    s.days_of_week,
    s.location,
    s.status AS schedule_status,
    s.ctime AS schedule_ctime,
    s.mtime AS schedule_mtime,
    GROUP_CONCAT(
        CONCAT(
            md.first_name, ' ', md.middle_name, ' ', md.last_name, ' (',
            md.phone_number, ', ', md.email_address, ', ', DATE_FORMAT(md.date_of_birth, '%Y-%m-%d'), ', ', md.gender, ', ',
            'Health Condition: ', m.health_condition, ')'
        ) SEPARATOR '; '
    ) AS members
FROM
    trainers_table t
    JOIN details_table td ON t.detail_id = td.id
    JOIN schedules_table s ON t.id = s.trainer_id
    JOIN member_table m ON m.package_id = s.id  -- Assuming package_id links to schedules_table
    JOIN details_table md ON m.detail_id = md.id
GROUP BY
    t.id, s.id;
