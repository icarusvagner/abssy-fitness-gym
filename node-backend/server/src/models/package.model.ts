export enum PackageType {
  Week = 'week',
  Weeks = 'weeks',
  Month = 'month',
  Months = 'months',
  Year = 'year',
  Years = 'years'
}

export enum PackageStatus {
  Active = 'active',
  Inactive = 'inactive',
  Removed = 'removed'
}

export interface PackageForCreate {
  package_name: string;
  duration: number;
  package_type: PackageType;
  price: number;
  benefits: string;
}

export interface PackageForUpdate {
	id: number;
	package_name: string;
	duration: number;
  package_type: PackageType;
	price: number;
	benefits: string;
  pack_status: PackageStatus;
}
