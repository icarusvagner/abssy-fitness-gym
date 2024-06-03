export enum PaymentMethod {
  Cash = 'cash',
  Card = 'card',
  Ecash = 'ecash'
}

export enum PaymentStatus {
  Active = 'active',
  Late = 'late',
  Early = 'early',
  Removed = 'removed'
}

export interface PaymentForCreate {
	member_id: number;
	amount: number;
	payment_date: string;
	payment_method: PaymentMethod;
	package_id: number;
}

export interface PaymentForUpdate {
	payment_id: number;
	amount: number;
	payment_date: string;
	payment_status: PaymentStatus;
	package_id: number;
}
