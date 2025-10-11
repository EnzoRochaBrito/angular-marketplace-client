import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAmount } from './select-amount';

describe('SelectAmount', () => {
  let component: SelectAmount;
  let fixture: ComponentFixture<SelectAmount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAmount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAmount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
