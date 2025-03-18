import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPdfComponent } from './payment-pdf.component';

describe('PaymentPdfComponent', () => {
  let component: PaymentPdfComponent;
  let fixture: ComponentFixture<PaymentPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
