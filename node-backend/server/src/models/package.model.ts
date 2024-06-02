export enum PackageDate {
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

export interface PackageForCreate {
  package_name: string;
  duration: number;
  package_date: PackageDate;
  price: number;
  benefits: string;
}

export interface PackageForUpdate {
	id: number;
	package_name: string;
	duration: number;
  package_date: PackageDate;
	price: number;
	benefits: string;
}
