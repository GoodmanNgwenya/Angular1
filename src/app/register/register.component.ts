import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms'

import { debounceTime, first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  emailMessage: string;
  passwordMessage: string;
  errorMessage: string;
  removeWhiteSpace: RegExp;
  user: User;

  private validateMessages = {
    required: 'Please enter your email address',
    email: 'Please enter a valid email address'
  }
  private validatePassMessages = {
    required: 'Please enter your password',
    email: 'Please enter a valid password'
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserService) {
      
     }
  
    

  ngOnInit(): void {
    this.removeWhiteSpace = new RegExp("\\S");
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3),Validators.pattern(this.removeWhiteSpace)]],
      lastName: ['', [Validators.required, Validators.maxLength(50),Validators.pattern(this.removeWhiteSpace)]],
      // emailGroup: this.fb.group({
      //   email: ['', [Validators.required, Validators.email]],
      //   confirmEmail:['',Validators.required],
      //   }, { validator: emailMatcher }),
      email: ['', [Validators.required, Validators.email]],
      passGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      })

    });

    const emailControl = this.registerForm.get('email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );

    const passControl = this.registerForm.get('passGroup.password');
    passControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setPassMessage(passControl)
    );
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validateMessages[key]).join(' ');
    }
  }

  setPassMessage(c: AbstractControl): void {
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors).map(
        key => this.validatePassMessages[key]).join(' ');
    }
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  /** 
   * Register user 
   */
  save(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.registerUser(this.registerForm.value)
      .subscribe(
        data => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }


}
