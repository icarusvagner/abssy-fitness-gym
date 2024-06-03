import { Gender } from "./auth.model";

export enum StaffRole {
  Receptionis = 'receptionis',
  Cleaner = 'cleaner',
  Encoder = 'encoder',
  Maintenance = 'maintenance',
  Attendant = 'attendant',
  Officer = 'officer',
  Childcare = 'childcare',
  Dietitian = 'dietitian',
  Consultant = 'consultant',
  Instructor = 'instructor', 
  Manager = 'manager'
}

export interface StaffForUpdate {
	staff_id: number;
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
	role: StaffRole;
	shift_schedule: string;
}
