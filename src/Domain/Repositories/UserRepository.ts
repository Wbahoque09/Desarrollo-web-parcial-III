import { User } from "../Entities/User";

export interface UserRepository {
  getUser: (id: string) => Promise<User | null>;
  addUser: (data: User) => Promise<User>;
  getUsers: () => Promise<User[]>;
  isAdmin: (id: string) => Promise<boolean>;
}
