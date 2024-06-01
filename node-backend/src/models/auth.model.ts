export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum Role {
  Receptionist = 'receptionist',
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

export enum RoleUpdate {
  Staff = 'staff',
  Admin = 'admin'
}

export enum AdminRole {
  Super = 'super',
  Admin = 'admin',
  Subadmin = 'subadmin'
}

export interface UserForLogin {
  username: string;
  password: string;
}

export interface AdminForCreate {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  date_of_birth: string;
  gender: Gender,
  street: string;
  brgy: string;
  city: string;
  province: string;
  username: string;
  password: string;
  role: AdminRole;
  permission_level: number;
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
  role: Role;
  shift_schedule: string;
}

export interface PasswordForUpdate {
  id: number;
  new_password: string;
  role: Role;
}
