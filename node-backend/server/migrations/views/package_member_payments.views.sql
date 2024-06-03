CREATE OR REPLACE VIEW member_payment_view AS
SELECT 
	mt.id AS member_id,
	pt.id AS payment_id,
	dt.first_name,
	dt.middle_name,
	dt.last_name,
	dt.phone_number,
	pt.amount,
	pt.payment_date,
	pt.payment_method,
	pack.package_name,
	DATE_FORMAT(pt.ctime, '%Y-%m-%d') AS ctime
FROM 
  member_table mt
LEFT JOIN 
  payments_table pt ON mt.id = pt.member_id
LEFT JOIN details_table dt ON dt.id = mt.detail_id
LEFT JOIN package_table pack ON pack.id = pt.package_id;

CREATE OR REPLACE VIEW member_package_view AS
SELECT 
  mt.id AS member_id,
  pt.id AS package_id,
	dt.first_name,
	dt.middle_name,
	dt.last_name,
	dt.phone_number,
	CONCAT(at2.street, ', ', at2.brgy, ', ', at2.city, ', ', at2.province) AS address,
  pt.package_name,
  pt.duration,
  pt.package_type,
  pt.price,
  pt.benefits
FROM 
  member_table mt
LEFT JOIN address_table at2 ON at2.id = mt.address_id
LEFT JOIN details_table dt ON dt.id = mt.detail_id
LEFT JOIN package_table pt ON mt.package_id = pt.id;
