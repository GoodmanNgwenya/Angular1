import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserData } from '../_helpers/user.data';

import { RegisterComponent } from '../register/register.component';
//import { LoginComponent } from '../login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { ItemAddComponent } from '../items/item-add.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(UserData),
    RouterModule.forChild([
      
      { path: 'addItem', component: ItemAddComponent,canActivate:[AuthGuard] },
      { path: 'register', component: RegisterComponent }
    ])
  ],
  declarations: [
    //LoginComponent,
    RegisterComponent
  ]
})
export class UserModule { }
