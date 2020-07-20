import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators, AbstractControl, ValidatorFn}from '@angular/forms'

import { debounceTime, first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';



function passMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passControl = c.get('password');
  const confirmControl = c.get('confirmPassword');

  if (passControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}

@Component({
//  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  emailMessage: string;
  passwordMessage: string;
  errorMessage: string;
  user: User;

  private validateMessages = {
    required: 'Please enter your email address',
    email:'Please enter a valid email address'
  }
  private validatePassMessages = {
    required: 'Please enter your password',
    email:'Please enter a valid password'
  }

  constructor(private fb:FormBuilder,private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      // emailGroup: this.fb.group({
      //   email: ['', [Validators.required, Validators.email]],
      //   confirmEmail:['',Validators.required],
      //   }, { validator: emailMatcher }),
      email: ['', [Validators.required, Validators.email]], 
      passGroup: this.fb.group({
        password: ['', [Validators.required,Validators.minLength(6)]],
        confirmPassword:['',Validators.required],
        }, { validator: passMatcher })
     
    });

    const emailControl = this.userForm.get('email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );

    const passControl = this.userForm.get('passGroup.password');
    passControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setPassMessage(passControl)
    );
  }

  setMessage(c: AbstractControl): void{
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validateMessages[key]).join(' ');
    }
  }

  setPassMessage(c: AbstractControl): void{
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors).map(
        key => this.validatePassMessages[key]).join(' ');
    }
  }

  saveUser(): void {
    //console.log('Saved: ' + JSON.stringify(this.userForm.value));
    if (this.userForm.valid) {
      if (this.userForm.dirty) {
        const p = { ...this.user, ...this.userForm.value };
          this.userService.registerUser(p)
              .pipe(first())
              .subscribe(
                data => {
                  this.userForm.reset();
                  console.log('Registration successful', true);
                  this.router.navigate(['/login']);
                  },
                  error => {
                     console.log(error);
                      
                  });
            
        } 
    } 
  }
  

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.userForm.reset();
    this.router.navigate(['/login']);
  }

}
