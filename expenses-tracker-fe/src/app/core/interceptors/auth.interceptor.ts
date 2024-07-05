import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {map, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {AuthService} from "../services/auth.service";
import { AlertsService } from "../services/alerts.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private alertsService: AlertsService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // skip access token logic on login and local assets
    if (request.url === environment.identityProviderUrl + '/signup'|| request.url === environment.identityProviderUrl + '/signin' || request.url.startsWith('assets')) {
      return next.handle(request);
    }

    request = this.addAuthHeadersToRequest(request);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // server errors
        console.log(error);
        if (error.error.statusCode.toString().startsWith('5')) {
          return throwError(() => new Error('Server not responding, please try again later.'));
        } else if (error.error.statusCode === 401) {
          this.authService.refreshToken().subscribe({
            next: (resp) => {
              if (resp.statusCode === 401) {
                this.authService.logout();
              } else {
                location.reload();
              }
            },
            error: (error) => {
              this.authService.logout();
              return of(error);
            }
          });
        }
        this.alertsService.showAlert(error.error.message, 'danger', false, 2000);
        return of(error);
      })
    );
  }


  /** Injects access token from cookie */
  addAuthHeadersToRequest(request: HttpRequest<any>): HttpRequest<any> {


    let token = this.authService.getToken();

    if (request.url === environment.identityProviderUrl + '/refresh') {
      token = this.authService.getRefreshToken();
    }

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json'
          }
        });
      }

      request = request.clone({
        headers: request.headers.set('Accept', 'application/json'),
      });
    }

    return request;
  }
}

export const authHttpInterceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];

