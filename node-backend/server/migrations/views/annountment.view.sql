CREATE OR REPLACE VIEW announcements_view AS
SELECT
    an.id AS announcement_id,
    ld.id AS login_id,
    admint.id AS admin_id,
    CONCAT(dt.first_name, ' ', dt.last_name) AS fullname,
    an.title AS title,
    an.message AS message,
    date_format(an.ctime, '%Y-%m-%d') AS created_at,
    an.stats AS stats
FROM
    announcement an
LEFT JOIN admin_table admint ON
    admint.login_id = an.user_id
LEFT JOIN login_details ld ON
    ld.id = admint.login_id
LEFT JOIN details_table dt ON dt.id = admint.detail_id;
