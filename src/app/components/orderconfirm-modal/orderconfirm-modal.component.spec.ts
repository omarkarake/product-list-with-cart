import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderconfirmModalComponent } from './orderconfirm-modal.component';

describe('OrderconfirmModalComponent', () => {
  let component: OrderconfirmModalComponent;
  let fixture: ComponentFixture<OrderconfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderconfirmModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderconfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
