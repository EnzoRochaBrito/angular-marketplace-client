import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCartModal } from './select-cart-modal';

describe('SelectCartModal', () => {
  let component: SelectCartModal;
  let fixture: ComponentFixture<SelectCartModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCartModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCartModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
