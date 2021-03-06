import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';


import { User } from '../_models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loggedIn=new BehaviorSubject<boolean>(false);
  //private loggedIn = new BehaviorSubject<boolean>(false); 

  get isAuthenticated() {
    return this.loggedIn.asObservable();
  }
  get isLoggedIn() {
    //return this.loggedIn.asObservable(); 
    return this.currentUserSubject;
  }

  private usersUrl = 'api/users';

  constructor(private http: HttpClient, private router: Router,) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      //tab(r => console.log(r)), //result from In memory api
      map((users: User[]) => {
        let foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
          //save user to local storage
          localStorage.setItem('login', JSON.stringify(foundUser));
          this.loggedIn.next(true);
          //pushing the found user to BehaviorSubject
          this.currentUserSubject.next(foundUser);
        }
        //return null if nothing was found
        return foundUser;
      })
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/welcome']);
  }

}