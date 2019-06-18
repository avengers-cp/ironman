import { Gender } from './gender.enum';
import { Role } from './role.enum';

export interface User {
  birthdate: Date;
  email: string;
  firstname: string;
  gender: Gender;
  id: string;
  lastname: string;
  role: Role;
}
