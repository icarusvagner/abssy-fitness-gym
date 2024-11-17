export interface DashboardForSelect {
  trainers: number;
  members: number;
  staffs: number;
}

export interface DashboardPerMonthForSelect {
  month_name: string;
  member_count: number;
}

export interface SalesReportType {
  amount: number;
  paid_at: number;
  updated_at: number;
}

export interface SalesPageType {
  month: string;
  total_amount: string;
}

export interface SalesPageArrayType {
  payments: SalesPageType[];
}
