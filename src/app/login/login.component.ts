import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: NgForm;
  isSubmitted = false;
  errorMessage: string;
  user: User;
  users: User[] = [];

  constructor(private router: Router,
    private userService: UserService, private authenticationService: AuthenticationService) {
  }


  ngOnInit(): void {

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }


  login(form: NgForm): void {

    this.isSubmitted = true;

    if (form.value.email === null) {
      return;
    }

    this.authenticationService.login(form.value.email, form.value.password)
      .subscribe({
        next: (user: User) => {
          if (user) {
            this.isSubmitted = true;
            this.router.navigate(['/editItem']);
            //console.log('Login successful');
          }
          else {
            this.errorMessage = 'Username not found';
          }
        }
      });

  }

}
