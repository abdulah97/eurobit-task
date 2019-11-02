import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken } from '../user/auth.token';
import { LoginService } from '../core/login/service/login.service';
import { Account } from '../user/account';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from '../core/login/model/login-request';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  account: Account;
  jwtHelper = new JwtHelperService;
  validCredentials = true;
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.initForms();
    this.loginForm.reset();
  }

  private initForms() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator])
    })
  }

  attemptLogin(formValue, event) {
    
    const user: LoginRequest = {
      username: formValue.username,
      password: formValue.password,
    };
    event.preventDefault();
    return this.loginService.attemptLogin(user).subscribe(
      (data: AuthToken) => {
        localStorage.setItem('auth_token', data.token);
      },
      (err) => {
        console.error(JSON.stringify(err));
        this.validCredentials = false;
      },
      () => {
        this.router.navigate(['']);
      }
    );
  }
  onRegisterClick(){
    this.router.navigateByUrl('/register');
  }
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
