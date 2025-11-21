export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  gender: string;
  phone: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CreateUserResponse {
  message: string;
}
