import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './service/user/user';
import { AuthService } from './service/auth/auth';
import { CookieService } from './service/cookie/cookie';
import { applicationTokens } from './utils/tokens';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  protected readonly title = signal('VerdiQ');
  authService   = inject(AuthService);
  cookieService = inject(CookieService)
  userService   = inject(UserService)

  ngOnInit(): void {
    this.refreshRotation()
  }

  private refreshRotation() {
    const refreshRotationSubscription = this.authService.refreshRotation().subscribe({
      next: (r) => {
        if (!r.body) return;
        const acessToken = r.body.acessToken
        this.cookieService.setCookie(applicationTokens.jwt.ACCESS_TOKEN, acessToken, applicationTokens.jwt.ACCESS_TOKEN_EXPIRATION);
        this.userService.isLogged.set(true)
      },
      complete: () => {
        refreshRotationSubscription.unsubscribe()
      }
    })
  }
}
