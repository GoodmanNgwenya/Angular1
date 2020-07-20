import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Observable } from 'rxjs';
import { User } from './_models/user';

@Component({
  selector: 'pm-root',
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" >{{pageTitle}}</a>
    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/welcome']">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" >Items</a>
      </li>
    </ul>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="nav navbar-nav ml-auto">
        <li color="primary" *ngIf="isLoggedIn$ | async as isLoggedIn">
        <a class="nav-link" (click)="onLogout()" *ngIf="isLoggedIn">Logout</a>
        </li>
          <li class="nav-item">
          <a class="nav-link"  [routerLink]="['/login']">Login</a>
          </li>
        </ul>
      </div>
  </nav>
  <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   pageTitle = 'Goodies-Online-Store';
// }
export class AppComponent implements OnInit {
  pageTitle = 'Goodies-Online-Store';
  isLoggedIn$: Observable<User>;                  
 
    
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout(){
    this.authService.logout();
  }
}
