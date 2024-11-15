import { api } from 'src/boot/axios';

class DashboardService<T, K> {
  private base_end_point: string;

  constructor() {
    this.base_end_point = '/dashboard';
  }

  async get_dashboard(): Promise<T[]> {
    const response = await api.get<T[]>(`${this.base_end_point}/get/dashboard`);
    return response.data;
  }

  async get_members_per_month(): Promise<T[]> {
    const response = await api.get<T[]>(
      `${this.base_end_point}/get/members-per-month`
    );
    return response.data;
  }
}

export default DashboardService;
