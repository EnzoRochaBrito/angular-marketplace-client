import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'select-amount',
  imports: [ReactiveFormsModule],
  templateUrl: './select-amount.html',
    styleUrl: './select-amount.css'
})
export class SelectAmount implements OnInit, OnDestroy {

@Input() negativeValue: boolean = false;
@Input() initialValue!: number;
@Input() maxValue!: number;
@Output() outputAmount: EventEmitter<number> = new EventEmitter<number>();

amount = new FormControl(1, [Validators.min(1)])

selectMinAmountSubscription!: Subscription;
selectAmountFocused$ = new BehaviorSubject<boolean>(false);

changeAmountSubscription!: Subscription;

setAmountControlState(focused: boolean) {
  this.selectAmountFocused$.next(focused)
}

ngOnInit(): void {
  if (this.initialValue) this.amount.setValue(this.initialValue);
  this.selectMinAmountSubscription = this.selectAmountFocused$.subscribe(v => {
    if (v) return;
    const selectProductAmount = this.amount.value
    if (selectProductAmount! > this.maxValue) this.amount.setValue(this.maxValue);
    if (!selectProductAmount || (selectProductAmount < 1 && !this.negativeValue)) {
      this.amount.setValue(1)
    }
  })
  this.changeAmountSubscription = this.amount.valueChanges
    .pipe(debounceTime(500))
    .subscribe(v => {
      if (v && v > 0) {
        this.outputAmount.emit(v)
      }
    })
}

ngOnDestroy(): void {
  this.selectMinAmountSubscription.unsubscribe()
  this.changeAmountSubscription.unsubscribe()
}

increase() {
  const value = this.amount.value! + 1
  if (this.maxValue && value === this.maxValue + 1) return;
  this.amount.setValue(value)
}

descrease() {
  const value = this.amount.value! - 1
  if (this.negativeValue) this.amount.setValue(value)
  if (value > 0) this.amount.setValue(value)
}
}
