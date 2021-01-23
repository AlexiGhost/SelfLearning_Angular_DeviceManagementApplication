export class User {
  constructor(public id: number,
              public firstName: string,
              public  lastName: string,
              public  email: string,
              public drinkPreference: string,
              public hobbies?: string[]) {}

  static clone(user: User): User {
    return new User(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.drinkPreference,
      user.hobbies
    );
  }
}
