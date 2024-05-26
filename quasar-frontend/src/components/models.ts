export interface LoginDetails {
  username: string;
  password: string;
}

export interface IDashboardCard {
  icon: string;
  name: string;
  count: number;
}

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface EmergencyContact {
  fullname: string;
  relationship: string;
  phoneNumber: string;
}

export interface IMembers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  emergencyContact: EmergencyContact;
  membershipType: 'Basic' | 'Standard' | 'Premium';
  isActive: boolean;
}

export interface MembersForCreate {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  emergencyContact: EmergencyContact;
  membershipType: 'Basic' | 'Standard' | 'Premium';
}

export interface TrainerForCreate {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  emergencyContact: EmergencyContact;
  startDate: string;
  endDate?: string;
  specializations: string[]; // Specializations or areas of expertise of the trainer
  certification: string; // Certification or qualification of the trainer
}

export interface GymStaff {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  role: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

export interface GymStaffForCreate {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  startDate: string;
  endDate?: string;
}

export interface GymTrainer extends GymStaff {
  specializations: string[]; // Specializations or areas of expertise of the trainer
  certification: string; // Certification or qualification of the trainer
}

export interface INewMember {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  emergencyContact: EmergencyContact;
  membershipType: 'Basic' | 'Standard' | 'Premium';
}
