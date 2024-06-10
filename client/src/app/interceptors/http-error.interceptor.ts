import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
          switch (error.status) {
            case 401:
              errorMessage = 'Unauthorized access. Please login.';
              break;
            case 403:
              errorMessage =
                'You do not have permission to perform this action.';
              break;
            case 404:
              errorMessage = 'Resource not found.';
              break;
            case 500:
              errorMessage =
                'An internal server error occurred. Please try again later.';
              break;
            default:
              errorMessage = `Unexpected error occurred. Error code: ${error.status}`;
          }
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
