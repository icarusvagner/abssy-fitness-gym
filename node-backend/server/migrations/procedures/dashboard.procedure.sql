DELIMITER //

CREATE OR REPLACE PROCEDURE get_dashboard()
BEGIN
    SELECT
        (SELECT COUNT(*) FROM trainers_table) AS trainers,
        (SELECT COUNT(*) FROM member_table) AS members,
        (SELECT COUNT(*) FROM staff_table) AS staffs;
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE get_members_per_month()
BEGIN
    SELECT
        MONTHNAME(ctime) AS month_name,
        COUNT(*) AS member_count
    FROM
        member_table
    WHERE
        YEAR(ctime) = YEAR(CURDATE())
    GROUP BY
        MONTH(ctime)
    ORDER BY
        MONTH(ctime);
END //

DELIMITER ;
