import { Gender } from "./auth.model";

export interface MemberForCreate {
	first_name: string;
	middle_name: string;
	last_name: string;
	phone_number: string;
	email_address: string;
	date_of_birth: string;
	gender: Gender;
	street: string;
	brgy: string;
	city: string;
	province: string;
	ec_first_name: string;
	ec_last_name: string;
	ec_relationship: string;
	ec_phone_number: string;
	package_id: number;
	health_condition: string;
  reference_no: string;
  purchased_id: string;
}

export interface MemberForUpdate {
	member_id: number;
	first_name: string;
	middle_name: string;
	last_name: string;
	phone_number: string;
	email_address: string;
	date_of_birth: string;
	gender: Gender;
	street: string;
	brgy: string;
	city: string;
	province: string;
	ec_first_name: string;
	ec_last_name: string;
	relationship: string;
	ec_phone_number: string;
	package_id: number;
	health_condition: string;
}
