import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserService } from './user.service';

import { User } from '../interfaces/user';
import { Gender } from '../interfaces/gender.enum';
import { Role } from '../interfaces/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userService: UserService) { }

  /**
   * Create a user account.
   * @param birthdate - Users date of birth.
   * @param email - Users email.
   * @param firstname - Users first name.
   * @param lastname - Users last name.
   * @param password - Users password.
   * @returns - Resolves when the user account has been created.
   */
  public createUser(
    birthdate: Date,
    email: string,
    firstname: string,
    gender: Gender,
    lastname: string,
    password: string
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userCredential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        const user: User = {
          birthdate,
          email,
          firstname,
          gender,
          id: userCredential.user.uid,
          lastname,
          role: Role.NORMAL
        };
        this.userService.createUserProfile(user); // don't need to wait for this to resolve.
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Login to the app with an email and password.
   * @param email - User's email.
   * @param password - User's password.
   * @returns - Resolves the users auth credential.
   */
  public login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Logout of the app.
   * @returns - Resolves when the user has logged out.
   */
  public logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  /**
   * Send a link to a specified email to allow a user to reset their password.
   * @param email - The email of the user attempting to reset their password.
   * @returns - Resolves when the password reset email has been sent.
   */
  public sendPasswordResetEmail(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
