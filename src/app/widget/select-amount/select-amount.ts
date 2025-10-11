import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'select-amount',
  imports: [ReactiveFormsModule],
  templateUrl: './select-amount.html',
    styleUrl: './select-amount.css'
})
export class SelectAmount implements OnInit, OnDestroy {

amount = new FormControl(1, [Validators.min(1)])

selectProductMinAmountSubscription!: Subscription;
selectProductAmountFocused$ = new BehaviorSubject<boolean>(false);

setProductAmountControlState(focused: boolean) {
  this.selectProductAmountFocused$.next(focused)
}

ngOnInit(): void {
  this.selectProductMinAmountSubscription = this.selectProductAmountFocused$.subscribe(v => {
    if (v) return;
    const selectProductAmount = this.amount.value
    if (!selectProductAmount || selectProductAmount < 1) {
      this.amount.setValue(1)
    }
  })
}

ngOnDestroy(): void {
  this.selectProductMinAmountSubscription.unsubscribe()
}

increase() {
  const value = this.amount.value! + 1
  this.amount.setValue(value)
}

descrease() {
  const value = this.amount.value! - 1
  if (value > 0) this.amount.setValue(value);
}
}
