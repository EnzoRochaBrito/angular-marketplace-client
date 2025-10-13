import { Component, OnInit } from '@angular/core';
import { StandartPage } from '../../../template/standart-page/standart-page';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [StandartPage, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfilePage {
  constructor(private router: Router) {
  }

  isRouteActive(route: string) {
    return this.router.isActive(route, { paths: 'subset', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' });
  }
}
