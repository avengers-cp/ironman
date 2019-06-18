import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor(private firestore: AngularFirestore) {}

  /**
   * Create a user profile for a new user.
   * @param user - The user object to save to the database.
   * @returns - Resolves when the user has been created.
   */
  public createUserProfile(user: User): Promise<void> {
    return this.firestore.doc<User>(this.userDocPatch(user.id)).set(user);
  }

  /**
   *
   * @param userId - The ID of the user
   */
  public loadUser(userId: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.firestore
        .doc<User>(this.userDocPatch(userId))
        .valueChanges()
        .subscribe((user: User) => {
          this.user = user;
          if (user) {
            resolve(user);
          } else {
            reject(new Error('No user found'));
          }
        });
    });
  }

  /**
   * Helper method to get the path for a user record.
   * @param userId - The ID of the user.
   * @returns - Path for the user object.
   */
  private userDocPatch(userId: string): string {
    return `users/${userId}`;
  }
}
