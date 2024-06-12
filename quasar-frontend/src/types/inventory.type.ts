export enum InventoryType {
  Supplement = 'supplement',
  Equipment = 'equipment'
}

export interface InventoryForInsert {
  brand_name: string;
  classification: string;
  base_count: string;
  p_type: string;
}

export interface InventoryForUpdate {
  inventory_id: number;
  quantity: number;
  p_type: InventoryType;
  classification: string;
}

export interface InventoryForSelect {
  id: number;
  p_type: InventoryType;
}

export interface InventoryForGet {
  inventory_id: string;
  base_count: string;
  total_count: string;
  ctime: string;
  mtime: string;
  category: string;
  item_id: string;
  item_name: string;
  item_type: string;
}

export interface InventoryForGetWrapper {
  inventories: [] as InventoryForGet
}

export interface InventoryLogForSelect {
  item_name: string;
  item_type: string;
  classification_type: string;
  count_added: string;
  log_state: string;
  date_added: string;
}

export interface InventoryLogForSelectWrapper {
  logs: [] as InventoryLogForSelect;
}
