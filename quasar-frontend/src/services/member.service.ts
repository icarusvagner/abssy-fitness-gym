import { api } from 'src/boot/axios';

class MemberService<T, K> {
  private base_end_point: string;

  constructor() {
    this.base_end_point = '/member';
  }

  async create(data: K): Promise<T[]> {
    const response = await api.post(`${this.base_end_point}/create`, data);
    return response.data;
  }

  async verify_change(data: K): Promise<T[]> {
    const response = await api.post(
      `${this.base_end_point}/verify-change`,
      data
    );
    return response.data;
  }

  async get(id: number): Promise<T> {
    const response = await api.get(`${this.base_end_point}/get/${id}`);
    return response.data;
  }

  async get_one(): Promise<T> {
    const response = await api.get(`${this.base_end_point}/one`);
    return response.data;
  }

  async check_verified_email(email: string): Promise<T> {
    const response = await api.get(
      `${this.base_end_point}/check-verified-email/${email}`
    );
    return response.data;
  }

  async put(id: number, data: K): Promise<T> {
    const response = await api.put(`${this.base_end_point}/update/${id}`, data);

    return response.data;
  }

  async login_member(data: K): Promise<T> {
    const response = await api.post(`${this.base_end_point}/login`, data);

    return response.data;
  }

  async after_login(data: K): Promise<T> {
    const response = await api.post(`${this.base_end_point}/after-login`, data);

    return response.data;
  }
}

export default MemberService;
