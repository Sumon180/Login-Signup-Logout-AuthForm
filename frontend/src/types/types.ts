export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface FormInput {
  id: string;
  name: keyof FormData;
  type: string;
  label: string;
}
