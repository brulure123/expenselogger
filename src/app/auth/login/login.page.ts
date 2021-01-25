import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToRegister(): void {
    this.router.navigateByUrl('auth/register');
  }

  navigateToForgotPassword(): void {
    this.router.navigateByUrl('auth/forgot');
  }
}
