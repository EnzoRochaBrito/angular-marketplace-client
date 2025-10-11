import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandartPage } from './standart-page';

describe('StandartPage', () => {
  let component: StandartPage;
  let fixture: ComponentFixture<StandartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandartPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
