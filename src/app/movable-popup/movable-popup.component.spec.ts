import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovablePopupComponent } from './movable-popup.component';

describe('MovablePopupComponent', () => {
  let component: MovablePopupComponent;
  let fixture: ComponentFixture<MovablePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovablePopupComponent]
    });
    fixture = TestBed.createComponent(MovablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
