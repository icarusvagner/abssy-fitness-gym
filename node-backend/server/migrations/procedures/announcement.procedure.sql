
DELIMITER //

CREATE OR REPLACE PROCEDURE create_announcement (
    IN p_user_id INT,
    IN p_title VARCHAR(128),
    IN p_message TEXT
)
BEGIN
    START TRANSACTION;
    
    INSERT INTO announcement (user_id, title, message)
    VALUES (p_user_id, p_title, p_message);
    
    COMMIT;
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE get_announcement (
    IN p_id INT
)
BEGIN
  IF p_id = 0 THEN
    SELECT * FROM announcements_view ORDER BY created_at DESC;
  ELSE
    SELECT * FROM announcements_view WHERE login_id = p_id;
  END IF;
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE update_announcement (
    IN p_id INT,
    IN p_user_id INT,
    IN p_title VARCHAR(128),
    IN p_message TEXT
)
BEGIN
    START TRANSACTION;

    UPDATE announcement
    SET
        user_id = p_user_id,
        title = p_title,
        message = p_message,
        mtime = current_timestamp()
    WHERE id = p_id;
    
    COMMIT;
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE delete_announcement (
    IN p_id INT
)
BEGIN
    START TRANSACTION;
    
    UPDATE announcement SET stats = 'removed' WHERE id = p_id;
    
    COMMIT;
END //

DELIMITER ;
