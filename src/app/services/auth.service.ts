import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

import { UserService } from './user.service';

import { Gender } from '../models/gender.enum';
import { Role } from '../models/role.enum';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticatedUser: firebase.User;
  public isLoggedIn$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.isLoggedIn$ = this.afAuth.user;
    this.isLoggedIn$.subscribe((user: firebase.User) => {
      this.authenticatedUser = user;
    });
  }

  /**
   * Create a user account.
   * @param dateOfBirth - Users date of birth.
   * @param email - Users email.
   * @param firstName - Users first name.
   * @param lastName - Users last name.
   * @param password - Users password.
   * @returns - Resolves when the user account has been created.
   */
  public createUser(
    dateOfBirth: Date,
    email: string,
    firstName: string,
    gender: Gender,
    lastName: string,
    password: string
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userCredential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        const user: User = {
          dateOfBirth,
          email,
          firstName,
          gender,
          id: userCredential.user.uid,
          lastName,
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
   * Get the currently logged in User.
   * @returns - Resolves with the firebase.User object if a user is logged in.
   *            If no user is logged in, rejects with an error.
   */
  public getLoggedInUser(): Promise<firebase.User> {
    return new Promise<firebase.User>((resolve, reject) => {
      if (this.authenticatedUser) {
        resolve(this.authenticatedUser);
      } else {
        this.isLoggedIn$.subscribe((user: firebase.User) => {
          if (user) {
            this.authenticatedUser = user;
            resolve(user);
          } else {
            reject(new Error('No user logged in'));
          }
        });
      }
    });
  }

  /**
   * Login to the app with an email and password.
   * @param email - User's email.
   * @param password - User's password.
   * @returns - Resolves the users auth credential.
   */
  public async login(email: string, password: string): Promise<void> {
    const userCredential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.authenticatedUser = userCredential.user;
    this.userService.loadUser(this.authenticatedUser.uid);
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
