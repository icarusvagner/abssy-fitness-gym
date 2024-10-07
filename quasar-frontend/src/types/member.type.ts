import { Gender } from './base.type';

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
}

export interface MemberForSelect {
  address_brgy : string;
  address_city : string;
  address_province : string;
  address_street : string;
  date_of_birth : string;
  ec_first_name : string;
  ec_last_name : string;
  ec_phone_number : string;
  ec_relationship : string;
  email_address : string;
  first_name : string;
  gender : string;
  health_condition : string;
  last_name : string;
  member_created_time : string;
  member_id : number;
  member_status : string;
  middle_name : string;
  package_id : number;
  phone_number : number;
}

export interface MemberForSelectWrapper {
  members: [] as MemberForSelect;
}

export interface OneMemberPackage {
  address: string;
  benefits: string;
  duration: number;
  first_name: string;
  last_name: string;
  member_id: number;
  middle_name: string;
  package_id: number;
  package_name: string;
  package_type: string;
  phone_number: string;
  price: string;
  registered_at: string;
}
