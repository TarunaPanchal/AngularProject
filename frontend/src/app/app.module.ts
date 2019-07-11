import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsereditComponent } from './useredit/useredit.component';

@NgModule({
  declarations: [
    AppComponent,
    EditProfileComponent,
    ListUserComponent,
    LoginComponent,
    RegisterComponent,
    UsereditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    ToastrModule.forRoot({
    timeOut: 2000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    enableHtml: true,
    }),
    RouterModule.forRoot([
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'admin',
        component: ListUserComponent,

      },
      {
        path: 'editprofile',
        component: EditProfileComponent,

      },
      {
        path: 'list',
        component: ListUserComponent,

      },
      {
        path: 'user-edit',
        component: UsereditComponent,

      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
