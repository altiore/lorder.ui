export const parseNumber = (value: string) => (typeof value === 'string' && value ? parseInt(value, 0) : null);
