import { Component, OnDestroy } from '@angular/core';
import { AuthPage } from '../../../template/auth-page/auth-page';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomInput } from '../../../widget/custom-input/custom-input';
import { AuthService } from '../../../service/auth/auth';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RegisterDto } from '../../../utils/types/auth.dto';
import { CookieService } from '../../../service/cookie/cookie';
import { applicationTokens } from '../../../utils/tokens';

@Component({
  selector: 'app-register',
  imports: [AuthPage, RouterLink, CustomInput, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterPage {

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {}

  registerSubscription!: Subscription;

  registerFormErrMessages = {
    username: {
      required:  'Necessário nome de usuário',
      minlength: 'Insira ao menos 4 caractéres',
      maxlength: 'Insira no máximo 125 caractéres'
    },
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

  registerForm = new FormGroup({
    username: new FormControl<String>('', [Validators.required, Validators.minLength(4), Validators.maxLength(125)]),
    email: new FormControl<string>('',    [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(125)])
  })

  submitRegistrationForm() {
    const dto: RegisterDto = {
      name: this.registerForm.controls.username.value!.toString(),
      email: this.registerForm.controls.email.value!.toString(),
      password: this.registerForm.controls.password.value!.toString()
    }

    this.registerSubscription = this.authService.register(dto).subscribe({
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
        this.registerSubscription.unsubscribe()
      },
    })
  }
}
