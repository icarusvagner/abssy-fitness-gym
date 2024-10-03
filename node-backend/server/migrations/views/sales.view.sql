CREATE OR REPLACE VIEW sales_report_view AS
SELECT
	st.id as sales_id,
	st.amount,
	st.trans_id,
	st.ref_no,
	st.acc_name,
	st.email_add,
	st.phone_number,
	st.description,
	st.date_paid,
	st.stat,
	st.ctime,
	st.mtime,
	pt.id,
	pt.package_name,
	pt.duration,
	pt.package_type,
	pt.purchase_count,
	pt.status
FROM
	sales_table st
LEFT JOIN
	package_table pt ON pt.id = st.package_id;
