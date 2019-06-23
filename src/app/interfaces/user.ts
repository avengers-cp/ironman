import { Gender } from './gender';

export interface User {
  dateOfBirth: Date;
  email: string;
  firstname: string;
  gender: Gender;
  id: string;
  lastname: string;
}
