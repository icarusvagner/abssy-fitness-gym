import { api } from 'src/boot/axios';

class PackageService<T, K> {
  private base_end_point: string;

  constructor() {
    this.base_end_point = '/package';
  }

  async create(data: K): Promise<T[]> {
    const response = await api.post(`${this.base_end_point}/create`, data);
    return response.data;
  }

  async get(): Promise<T> {
    const response = await api.get(`${this.base_end_point}/get/0`);
    return response.data;
  }

  async get_by_id(id: number): Promise<T> {
    const response = await api.get(`${this.base_end_point}/get/${id}`);
    return response.data;
  }

  async update(data: K): Promise<T> {
    const response = await api.post(`${this.base_end_point}/update`, data);
    return response.data;
  }

  async delete(id: number): Promise<T> {
    const response = await api.post(`${this.base_end_point}/delete`, { id });
    return response.data;
  }
}

export default PackageService;
