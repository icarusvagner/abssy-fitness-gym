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

  async get(id: number): Promise<T> {
    const response = await api.get(`${this.base_end_point}/get/${id}`);
    return response.data;
  }
}

export default MemberService;

