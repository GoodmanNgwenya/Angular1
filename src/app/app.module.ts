import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { FormsModule } from '@angular/forms';
import { UserModule } from './users/user.module';
import { ItemListComponent } from './items/item-list.component';
import { LoginComponent } from './login/login.component';
import { ItemEditComponent } from './items/item-edit.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    ItemListComponent,
    ItemEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    UserModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
