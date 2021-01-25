import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.min(8)]),
  });
  constructor() { }

  ngOnInit() {
  }

  // Todo : Implement Forgot Password Functionality after Back-end Ready
  doRegister(): void{
    console.log("Register Form Submitted");
  }

}
