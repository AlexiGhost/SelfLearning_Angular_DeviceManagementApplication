import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  userSubject = new Subject<User[]>();

  constructor() { }

  emitUsers(): void {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User): void {
    this.users.push(user);
    this.emitUsers();
  }
}
