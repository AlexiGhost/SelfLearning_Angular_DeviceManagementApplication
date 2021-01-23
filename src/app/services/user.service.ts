import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'James',
      lastName: 'Lanister',
      email: 'james.lanister@mail.com',
      drinkPreference: 'Pepsi',
      hobbies: [
        'code',
        'reading'
      ]
    }
  ];
  userSubject = new Subject<User[]>();

  constructor() {
  }

  /**
   * Make the subject emit, allowing subscribed objects to be notified.
   */
  emitUsers(): void {
    this.userSubject.next(this.users.slice());
  }

  /**
   * Add a new user to the service
   * @param user the new user, id is automatically overloaded
   */
  addUser(user: User): void {
    let newUserId = 1;
    this.users.find(u => {
      if (u.id >= newUserId) {
        newUserId = u.id + 1;
      }
    });
    user.id = newUserId;
    this.users.push(user);
    this.emitUsers();
  }

  /**
   * Return a copy of an user (if exist)
   * @param id user identifier
   */
  getUser(id: number): User | undefined {
    const user = this.users.find(u => {
      return u.id === id;
    });
    if (user) {
      return User.clone(user);
    }
    return undefined;
  }

  /**
   * Update an existing user
   * @param updatedUser the user updated (id as reference)
   */
  updateUser(updatedUser: User): void {
    const user = this.users.find(u => {
      return u.id === updatedUser.id;
    });
    if (user) {
      user.firstName = updatedUser.firstName;
      user.lastName = updatedUser.lastName;
      user.email = updatedUser.email;
      user.drinkPreference = updatedUser.drinkPreference;
      user.hobbies = updatedUser.hobbies;
      this.emitUsers();
    }
  }
}
