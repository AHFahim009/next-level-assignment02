import { Model } from 'mongoose';
import { Orders } from './order.interface';

export interface User {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Orders[];
}
// static method:
export interface UserStaticModel extends Model<User> {
  isUserExit(id: number): Promise<User | null>;
}
