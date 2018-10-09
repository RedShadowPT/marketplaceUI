import { Component, OnInit } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { RouterOutlet, Router } from '@angular/router';

import { AuthToken } from '../../interfaces/AuthToken';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  authUser: AuthToken;
  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authUser = this.authService.getAuthUser();
    this.router.navigate(['/admin/settings']);
  }

  // User Logout
  onLogout() {
    this.authService.logout();
  }
}
