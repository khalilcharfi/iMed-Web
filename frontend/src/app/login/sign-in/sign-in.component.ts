import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbSpinnerService } from '@nebular/theme';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'ngx-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})


export class SignInComponent implements OnInit {
  public alive = true;
  public username;
  public password;

  constructor(
    public GSpinner: NbSpinnerService,
    public authService: AuthService,
    private router : Router
  ) {
    this.GSpinner.load();
  }

  ngOnInit(): void {
  }


  async login() {
    const info = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateSignIn(info).subscribe((data:any)=> {
      console.log(data)
      if (data[0].success){
         this.authService.storeData(data[0].token, data[0].user.username);
        if(this.authService.checkToken() === true){
          this.router.navigateByUrl('/admin');
        }
      }
    });
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
