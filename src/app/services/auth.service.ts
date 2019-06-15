import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

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
          id: userCredential.user.uid,
          lastname
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
}
