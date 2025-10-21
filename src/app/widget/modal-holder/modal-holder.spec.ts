import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHolder } from './modal-holder';

describe('ModalHolder', () => {
  let component: ModalHolder;
  let fixture: ComponentFixture<ModalHolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHolder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
