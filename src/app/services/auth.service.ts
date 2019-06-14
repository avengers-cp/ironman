import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  /**
   * Login to the app with an email and password.
   * @param email - User's email.
   * @param password - User's password.
   * @returns - Resolves the users auth credential.
   */
  public login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
