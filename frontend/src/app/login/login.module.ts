import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignInComponent,
    RegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class LoginModule { }
