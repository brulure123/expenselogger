import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private showPassword: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  doLogin(): void {
    const loginFormValues = this.loginForm.value;
    this.authService.loginWithEmailAndPassword(
        loginFormValues.email,
        loginFormValues.password
    ).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err)
    });
  }

  togglePasswordFieldType(): void {
    this.showPassword = !this.showPassword;
  }
}
