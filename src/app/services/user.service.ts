import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  /**
   * Create a user profile for a new user.
   * @param user - The user object to save to the database.
   * @returns - Resolves when the user has been created.
   */
  public createUserProfile(user: User): Promise<void> {
    return this.firestore.doc<User>(this.userDocPatch(user.id)).set(user);
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
