import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeTopbar } from './alternative-topbar';

describe('AlternativeTopbar', () => {
  let component: AlternativeTopbar;
  let fixture: ComponentFixture<AlternativeTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternativeTopbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlternativeTopbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
