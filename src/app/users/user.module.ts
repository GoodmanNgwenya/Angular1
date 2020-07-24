import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserData } from '../_helpers/user.data';

import { RegisterComponent } from '../register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { ItemAddComponent } from '../items/item-add.component';
import { ItemEditComponent } from '../items/item-edit.component';
import { ItemEditGuard } from '../items/item-edit.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(UserData),
    RouterModule.forChild([
      { path: 'editItem', component: ItemEditComponent, canActivate: [AuthGuard] },
      { path: 'addItem', component: ItemAddComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'addItem/:id/edit',
        canDeactivate: [ItemEditGuard],
        component: ItemAddComponent
      }
    ])
  ],
  declarations: [
    RegisterComponent,
    ItemAddComponent
  ]
})
export class UserModule { }
