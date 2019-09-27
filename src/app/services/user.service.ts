import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Gender } from '../models/gender.enum';
import { Role } from '../models/role.enum';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((authUser: firebase.User) => {
        if (authUser) {
          return this.firestore.doc<User>(`users/${authUser.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
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
        // Don't need to wait for below to finish. This will improve performance of this function.
        this.firestore.doc<User>(`users/${user.id}`).set(user);
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
  public async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
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
