import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    const req = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(req).pipe(catchError(e => this.handleAuthError(e)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    if (err.status === 403) {
      this.router.navigate(['/404']);
      return of(err.message);
    }
    if (err.status === 401) {
      this.router.navigate(['/auth/login']);
      return of(err.message);
    }
    return throwError(() => err);
  }
}
