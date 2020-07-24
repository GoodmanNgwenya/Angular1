import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { User } from '../_models/user';
import { stringify } from '@angular/compiler/src/util';
import { ReturnStatement } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/`, { user });
  }

  registerUser(user: User): Observable<User> {
    //return this.http.post<User>(`${this.usersUrl}/`, { user });
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((users: User[]) => {
        let foundUser = users.find(u => u.email === user.email);
        if (foundUser) {
          console.log('Username "' + user.email + '" is already taken')
        }
        this.register(user);
        user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem('registerUser', JSON.stringify(foundUser));
        //pushing the found user to BehaviorSubject
        this.currentUserSubject.next(foundUser);
        return foundUser;
      })
    );
  }

}
