const checkValidEnumValue = <T extends Record<string, string>>(
  enumType: T, 
  value: string
): T[keyof T] | null => {
  const enumValue = Object.values(enumType).find(v => v === value) as T[keyof T];
  return enumValue ?? null;
};

export default checkValidEnumValue;
