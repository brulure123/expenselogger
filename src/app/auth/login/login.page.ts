import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToRegister(): void {
    this.router.navigateByUrl('auth/register');
  }

  navigateToForgotPassword(): void {
    this.router.navigateByUrl('auth/forgot');
  }

  // Todo : Implement Login Functionality after Back-end Ready
  doLogin(): void {
    console.log("Login form submitted");
  }
}
