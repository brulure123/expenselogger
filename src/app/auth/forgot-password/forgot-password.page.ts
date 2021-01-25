import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  constructor() { }

  ngOnInit() {
  }

  // Todo : Implement Forgot Password Functionality after Back-end Ready
  onSubmit(): void {
    console.log("Forgot Password Submitted");
  }

}
