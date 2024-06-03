import { Gender } from './auth.model';

export interface TrainerForCreate {
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
	specialization: string;
	certifications: string;
	experience_years: string;
	hire_date: string;
	availability: string;
}

export interface TrainerForUpdate {
	trainer_id: number;
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
	specialization: string;
	certifications: string;
	experience_years: string;
	hire_date: string;
	availability: string;
	trainer_status: string;
}
