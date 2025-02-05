export interface IUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IFormValues {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse extends IUser {
  token: string;
}
