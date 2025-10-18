import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStorePage } from './create-store';

describe('CreateStorePage', () => {
  let component: CreateStorePage;
  let fixture: ComponentFixture<CreateStorePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStorePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
