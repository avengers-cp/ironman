import { Gender } from './gender';

export interface User {
  birthdate: Date;
  email: string;
  firstname: string;
  gender: Gender;
  id: string;
  lastname: string;
}
