import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../../utils/backend-routes/backend.routes';
import { AuthResponse, LoginDto, RegisterDto } from '../../utils/types/auth.dto';
import { Router } from '@angular/router';
import { CookieService } from '../cookie/cookie';
import { applicationTokens } from '../../utils/tokens';
import { UserService } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private userService: UserService) {}

  login(dto: LoginDto) {
    const loginSubscription = this.http.post<AuthResponse>(server.api.auth.login, dto, { observe: 'response', withCredentials: true }).subscribe({
      next: (res) => {
        if (!res.body) return
        const acessToken = res.body.acessToken
        this.cookieService.setCookie(applicationTokens.jwt.ACCESS_TOKEN, acessToken, applicationTokens.jwt.ACCESS_TOKEN_EXPIRATION)
        this.userService.isLogged.set(true)
        this.router.navigate(['/'])
      },
      complete: () => {
        loginSubscription.unsubscribe()
      },
    })
  }
  
  register(dto: RegisterDto) {
    const registerSubscription = this.http.post<AuthResponse>(server.api.auth.register, dto, { observe: 'response', withCredentials: true }).subscribe({
      next: (res) => {
        if (!res.body) return
        const acessToken = res.body.acessToken
        this.cookieService.setCookie(applicationTokens.jwt.ACCESS_TOKEN, acessToken, applicationTokens.jwt.ACCESS_TOKEN_EXPIRATION)
        this.userService.isLogged.set(true)
        this.router.navigate(['/'])
      },
      complete: () => {
        registerSubscription.unsubscribe()
      },
    })
  }

  refreshRotation() {
    return this.http.get<{acessToken: string}>(server.api.auth.refreshRotation, {observe: 'response', withCredentials: true })
  }
}
