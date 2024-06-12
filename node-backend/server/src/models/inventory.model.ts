export enum InventoryType {
  Supplement = 'supplement',
  Equipment = 'equipment'
}

export enum InventoryClassification {
  Add = 'add',
  Minus = 'minus',
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
