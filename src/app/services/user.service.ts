import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDoc: AngularFirestoreDocument<User>;
  private user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public user$: Observable<User> = this.user.asObservable();

  constructor(private firestore: AngularFirestore) { }

  /**
   * Create a user profile for a new user.
   * @param user - The user object to save to the database.
   * @returns - Resolves when the user has been created.
   */
  public createUserProfile(user: User): Promise<void> {
    return this.firestore.doc<User>(this.userDocPath(user.id)).set(user);
  }

  /**
   * Load the user and subscribe to the user.
   * @param userId - The ID of the user.
   * @returns - Resolves after the user has been loaded.
   */
  public loadUser(userId: string): Promise<User> {
    return new Promise<User>((resolve) => {
      this.userDoc = this.firestore.doc<User>(this.userDocPath(userId));
      this.subscribeToUserDoc();

      const unsubscribe$ = new Subject<void>();

      this.user$
        .pipe(takeUntil(unsubscribe$))
        .subscribe((user: User) => {
          if (user) {
            unsubscribe$.next();
            unsubscribe$.complete();
            resolve(user);
          }
        });
    });
  }

  /**
   * Subscribe to the user's profile.
   * Any new changes will be updated in the client automatically.
   */
  private subscribeToUserDoc(): void {
    this.userDoc.valueChanges().subscribe((user: User) => {
      this.user.next(user);
    });
  }

  /**
   * Helper method to get the path for a user record.
   * @param userId - The ID of the user.
   * @returns - Path for the user object.
   */
  private userDocPath(userId: string): string {
    return `users/${userId}`;
  }
}
