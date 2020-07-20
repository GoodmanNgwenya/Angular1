import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User } from '../_models/user';

export class UserData implements InMemoryDbService{
  createDb(): { users: User[] }{
    const users: User[] = [
      {
        id: 1,
        firstName: 'Goodman',
        lastName: 'Ngwenya',
        email: 'goodman@gmail.com',
        password: '123456'
      },
      {
        id: 2,
        firstName: 'Lindo',
        lastName: 'White',
        email: 'lindo@gmail.com',
        password: '246810'
      },
      {
        id: 3,
        firstName: 'Gman',
        lastName: 'Croc',
        email: 'gman@gmail.com',
        password: '123456'
      },
      {
        id: 4,
        firstName: 'Donald',
        lastName: 'Green',
        email: 'green@gmail.com',
        password: '123456'
      },
      {
        id: 5,
        firstName: 'Spha',
        lastName: 'Ngozi',
        email: 'spha5@gmail.com',
        password: '123456'
      }
    ];
    return { users };
  }
}