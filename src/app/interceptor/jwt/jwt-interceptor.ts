import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from '../../service/cookie/cookie';
import { applicationTokens } from '../../utils/tokens';
import { catchError, Observable, Subscription, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../service/auth/auth';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService)
  const authService = inject(AuthService)
  const accessToken = cookieService.getCookie(applicationTokens.jwt.ACCESS_TOKEN)
  const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
  })
  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 || !accessToken) {
        return authService.refreshRotation().pipe(
          switchMap(v => {
            const newToken = v.body?.acessToken
            if (!newToken) return throwError(() => err);
            cookieService.setCookie(applicationTokens.jwt.ACCESS_TOKEN, newToken, 5*60)

            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            })
            return next(newAuthReq)
          }),
          catchError((refreshErr) => {
            console.error('Erro ao atualizar token:', refreshErr)
            return throwError(() => refreshErr)
          })
        )
      }
      return throwError(() => err)
    })
  )
}