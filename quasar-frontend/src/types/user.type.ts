import { Gender, UserStatus } from './base.type';

export enum AdminRole {
  Super = 'super',
  Admin = 'admin',
  Subadmin = 'subadmin'
}

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

export interface AdminForSelect {
  id: number;
  login_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  date_of_birth: string;
  gender: Gender;
  admin_role: AdminRole;
  permission_level: number;
}

export interface StaffForSelect {
  staff_id: number;
  login_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  date_of_birth: string;
  gender: Gender;
  address_street: string;
  address_brgy: string;
  address_city: string;
  address_province: string;
  ec_first_name: string;
  ec_last_name: string;
  ec_relationship: string;
  ec_phone_number: string;
  role: StaffRole;
  hire_date: string;
  shift_schedule: string;
  staff_status: UserStatus;
}

export interface StaffForSelectWrapper {
  staffs: [] as StaffForSelect
}

export interface StaffForCreate {
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
  provine: string;
  ec_first_name: string;
  ec_last_name: string;
  relationship: string;
  ec_phone_number: string;
  username: string;
  password: string;
  role: StaffRole;
  shift_schedule: string;
}

export interface StaffForUpdate {
  staff_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  date_of_birth: string;
  gender: string;
  street: string;
  brgy: string;
  city: string;
  province: string;
  ec_first_name: string;
  ec_last_name: string;
  relationship: string;
  ec_phone_number: string;
  role: string;
  shift_schedule: string;
}
