import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../core/register/service/register.service';
import { RegisterRequest } from '../core/register/model/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.initForms();
  }

  private initForms() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator])
    })
  }

  registerUser(formValue){
    const user: RegisterRequest = {
      username: formValue.username,
      password: formValue.password,
    };
    console.log(user)
    this.registerService.registerUser(user).subscribe((data) => {

    },
      (err) => {
        console.log(err)
      });

  }
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
