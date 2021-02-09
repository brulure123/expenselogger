import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit{

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.min(8)]),
  });

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  doRegister(): void{
    const loginFormValues = this.registerForm.value;
    this.authService.registerWithEmailAndPassowrd(
        loginFormValues.email,
        loginFormValues.password
    ).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err)
    });
  }
}
