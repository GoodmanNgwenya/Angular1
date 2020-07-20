import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { User } from '../_models/user';
import { stringify } from '@angular/compiler/src/util';


 @Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private usersUrl = 'api/users';
  private foundUser: any;

   constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    }
   
   CheckExistUser(email: string):Observable<User> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      //tab(r => console.log(r)), //result from In memory api
      map((users: User[]) => {
        this.foundUser = users.find(u => u.email === email);
        if (this.foundUser) {
              //save user to local storage
              localStorage.setItem('login', JSON.stringify(this.foundUser));
              //pushing the found user to BehaviorSubject
              this.currentUserSubject.next(this.foundUser);
        }
        //return null if nothing was found
        return this.foundUser;
      })
    );
  }

 
   registerUser(user: User): Observable<User> {
     return this.http.post<User>(`${this.usersUrl}/`, { user });
  }
   

  private initializeUser(): User {
    // Return an initialized object
    return {
      id: 0,
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };
  }
  
}
