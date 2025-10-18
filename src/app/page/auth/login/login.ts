import { Component, OnInit } from '@angular/core';
import { AuthPage } from '../../../template/auth-page/auth-page';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../../../widget/custom-input/custom-input';
import { AuthService } from '../../../service/auth/auth';
import { CommonModule } from '@angular/common';
import { LoginDto } from '../../../utils/types/auth.dto';
import { Subscription } from 'rxjs';
import { CookieService } from '../../../service/cookie/cookie';
import { applicationTokens } from '../../../utils/tokens';

@Component({
  selector: 'app-login',
  imports: [AuthPage, RouterLink, ReactiveFormsModule, CustomInput, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPage {

  constructor(private authService: AuthService) { }

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

    this.authService.login(dto)
  }

}
