import { api } from 'src/boot/axios';

class InventoryService<T, K> {
  private base_end_point: string;

  constructor() {
    this.base_end_point = '/inventory';
  }

  async create(data: K): Promise<T> {
    const response = await api.post<T>(`${this.base_end_point}/create`, data);
    return response.data;
  }

  async get(data: K): Promise<T[]> {
    const response = await api.post<T[]>(`${this.base_end_point}/get`, data);
    return response.data;
  }

  async get_log(): Promise<T[]> {
    const response = await api.get<T[]>(`${this.base_end_point}/log`);
    return response.data;
  }

  async update(data: K): Promise<T> {
    const response = await api.post<T>(`${this.base_end_point}/update`, data);
    return response.data;
  }
}

export default InventoryService;
