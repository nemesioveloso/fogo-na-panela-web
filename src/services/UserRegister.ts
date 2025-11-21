import { apiService } from "../api/request";
import { CreateUserRequest, CreateUserResponse } from "../models/UserRegister";

export const userService = {
  register: (data: CreateUserRequest) =>
    apiService.post<CreateUserResponse>("/api/users/register", data),
};
