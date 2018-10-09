import { Component } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor (public authService: AuthService, public router: Router) {}

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    // request auth token to backend
    this.authService.login(loginForm.value.loginEmail, loginForm.value.loginPassword);
  }
}
