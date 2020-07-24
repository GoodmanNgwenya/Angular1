import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Observable } from 'rxjs';
import { User } from './_models/user';

@Component({
  selector: 'pm-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  pageTitle = 'Goodies-Online-Store';
  isLoggedIn$: Observable<User>;
  
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }

}
