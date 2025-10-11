import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fromEvent, interval, map, mergeAll, take, window } from 'rxjs';

@Component({
  selector: 'topbar',
  imports: [RouterLink],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class Topbar {
}
