export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^[\d\s\-+()]{7,20}$/.test(phone);
}

export function validateLength(
  value: string,
  min: number,
  max: number
): boolean {
  return value.length >= min && value.length <= max;
}

export type ValidationErrors = Record<string, string>;

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
