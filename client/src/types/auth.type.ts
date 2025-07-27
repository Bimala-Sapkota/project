export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  confirm_password: string;
  phone?: string;
}
