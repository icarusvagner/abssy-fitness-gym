CREATE OR REPLACE VIEW dashboard_view AS
SELECT
  (SELECT COUNT(*) FROM member_table) AS members_count,
  (SELECT COUNT(*) FROM admin_table) AS admins_count,
  (SELECT COUNT(*) FROM staff_table) AS staffs_count;

