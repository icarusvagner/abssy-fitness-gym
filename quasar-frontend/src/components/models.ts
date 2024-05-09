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
  startDate: string;
  endDate?: string;
  isActive: boolean;
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
