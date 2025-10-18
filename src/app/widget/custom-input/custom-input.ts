import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'custom-input',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css'
})
export class CustomInput implements OnInit, OnDestroy {
@Input() control!: FormControl
@Input() inputName!: String
@Input() inputType!: 'text' | 'password'
@Input() errMsg!: {[errCode: string]: string};
errCode!: string;
controlSubscription!: Subscription

ngOnInit(): void {
  this.controlSubscription = this.control.valueChanges.subscribe(()=>{
    if (this.control.invalid) {
      if (this.control.errors){
        this.errCode = Object.keys(this.control.errors)[0]
      }
    } else {
      this.errCode = '';
    }
  })
}
ngOnDestroy(): void {
  this.controlSubscription.unsubscribe()
}
}
