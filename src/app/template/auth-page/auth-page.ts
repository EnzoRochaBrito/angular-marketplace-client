import { Component, Input } from '@angular/core';
import { AlternativeTopbar } from '../../layout/alternative-topbar/alternative-topbar';

@Component({
  selector: 'auth-page',
  imports: [AlternativeTopbar],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css'
})
export class AuthPage {
@Input() title!: string;
}
