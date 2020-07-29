export const parseNumber = (value: string) => (typeof value === 'string' && value ? parseFloat(value) : null);
