import { Component, OnInit } from '@angular/core';
import { AuthPage } from '../../../template/auth-page/auth-page';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthInput } from '../../../widget/auth-input/auth-input';
import { AuthService } from '../../../service/auth/auth';
import { CommonModule } from '@angular/common';
import { LoginDto } from '../../../utils/types/auth.dto';
import { Subscription } from 'rxjs';
import { CookieService } from '../../../service/cookie/cookie';
import { applicationTokens } from '../../../utils/tokens';

@Component({
  selector: 'app-login',
  imports: [AuthPage, RouterLink, ReactiveFormsModule, AuthInput, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPage {

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) { }

  loginSubscription!: Subscription;

  loginFormErrMessages = {
    email: {
      required: 'Necessário email',
      email:    'Insira um email válido',
    },
    password: {
      required:  'Necessário senha',
      minlength: 'Insira ao menos 6 caractéres',
      maxlength: 'Insira no máximo 125 caractéres'
    }
  }

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(125)])
  })

  submitLoginForm() {
    const dto: LoginDto = {
      email: this.loginForm.controls.email.value!,
      password: this.loginForm.controls.password.value!
    }

    this.loginSubscription = this.authService.login(dto).subscribe({
      next: (res) => {
        if (!res.body) return
        const acessToken = res.body.acessToken
        this.cookieService.setCookie(applicationTokens.jwt.ACCESS_TOKEN, acessToken, 5 * 60)
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log('error')
        console.log(err)
      },
      complete: () => {
        this.loginSubscription.unsubscribe()
      },
    })
  }

}
