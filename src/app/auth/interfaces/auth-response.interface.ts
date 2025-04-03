import { User } from "./user.iterface";

export interface AuthResponse {
  user:  User;
  token: string;
}
