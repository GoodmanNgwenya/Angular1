import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User } from '../_models/user';
import { Item } from '../_models/item';

export class UserData implements InMemoryDbService {
  createDb(): { users: User[], items: Item[] } {
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
    const items: Item[] = [
      {
        "id": 1,
        "itemHeader": "Phone",
        "releaseDate": "July 1, 2020",
        "description": "Samsung Galaxy A20",
        "price": 2800.95,
        "imageUrl": "assets/images/samsungS7.png",
        "userId": 2
      },
      {
        "id": 2,
        "itemHeader": "Laptop",
        "releaseDate": "July 18, 2020",
        "description": "Toshiba intel inside",
        "price": 3500.99,
        "imageUrl": "assets/images/toshiba.png",
        "userId": 1
      },
      {
        "id": 3,
        "itemHeader": "Mobile Router",
        "releaseDate": "July 21, 2020",
        "description": "Huawei portable router with good condition",
        "price": 600.9,
        "imageUrl": "assets/images/hawueiRouter.png",
        "userId": 1
      },
      {
        "id": 4,
        "itemHeader": "USB",
        "releaseDate": "June 15, 2020",
        "description": "SandDisk Cruzer Blade",
        "price": 58.55,
        "imageUrl": "assets/images/usb.png",
        "userId": 3
      },
      {
        "id": 5,
        "itemHeader": "Joystick",
        "releaseDate": "March 30, 2019",
        "description": "Vibration USB Controller for PC - 2 Pack",
        "price": 135.95,
        "imageUrl": "assets/images/joystick.png",
        "userId": 2
      }
    ];
    return { users, items };
  }
}