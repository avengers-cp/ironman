import { Gender } from './gender.enum';
import { Role } from './role.enum';

export interface User {
  dateOfBirth: Date;
  email: string;
  firstName: string;
  gender: Gender;
  id: string;
  lastName: string;
  role: Role;
}
