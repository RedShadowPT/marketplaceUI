import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor (private authService: AuthService) {}

  intercept (req: HttpRequest<any>, next: HttpHandler) {
    const authUser = this.authService.getAuthUser();
    const token = (authUser ? authUser.token : 'undefined');
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next.handle(authRequest);
  }
}

