import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './core/login/service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private loginService: LoginService) { }
  public isLoggedIn(): boolean {
    if (localStorage.getItem('auth_token') === null){
      return false;
    }
    else{
      return true;
    }
  }
  navigate(url){
    this.router.navigateByUrl(url);
  }
}
