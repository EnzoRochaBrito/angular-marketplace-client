import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css'
})
export class Dropdown {
@Input() title!: string
@Input() content!: string
open: boolean = false;

toggle(){
  this.open = !this.open
}
}
