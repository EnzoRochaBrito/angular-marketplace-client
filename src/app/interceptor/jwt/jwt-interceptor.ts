import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from '../../service/cookie/cookie';
import { applicationTokens } from '../../utils/tokens';
import { catchError, Observable, Subscription, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../service/auth/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user/user';
import { server } from '../../utils/backend-routes/backend.routes';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService)
  const authService = inject(AuthService)
  const userService = inject(UserService)
  const router = inject(Router)
  const accessToken = cookieService.getCookie(applicationTokens.jwt.ACCESS_TOKEN)

  // prevents unecessary interception
  if (req.url.includes(server.api.auth.refreshRotation)) {
    return next(req)
  }

  const authReq = accessToken ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
  }) : req

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return authService.refreshRotation().pipe(
          switchMap(v => {
            
            const newToken = v.body?.acessToken
            if (!newToken) return throwError(() => err);
            cookieService.setCookie(applicationTokens.jwt.ACCESS_TOKEN, newToken, applicationTokens.jwt.ACCESS_TOKEN_EXPIRATION)
            userService.isLogged.set(true)

            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            })

            return next(newAuthReq)
          }),
          catchError((refreshErr: HttpErrorResponse) => {
            if (refreshErr.status === 403) {
              userService.isLogged.set(false)
              router.navigate(['/login'])
              // logout locally
            }
            console.error('Erro ao atualizar token:', refreshErr)
            return throwError(() => refreshErr)
          })
        )
      }
      return throwError(() => err)
    })
  )
}