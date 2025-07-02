import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    customerServiceSpy = jasmine.createSpyObj('CustomerService', [
      'createCustomer',
      'updateCustomer',
      'deleteCustomer',
    ]);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [ModalComponent, FormsModule],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: Store, useValue: storeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close when onClose is called', () => {
    spyOn(component.close, 'emit');
    component['onClose']();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should call createCustomer and emit customerUpdated and close', () => {
    spyOn(component.customerUpdated, 'emit');
    spyOn(component.close, 'emit');
    component['customer'] = { name: 'Test', salary: 100, companyValuation: 200 };
    customerServiceSpy.createCustomer.and.returnValue(of({ name: 'Test', salary: 100, companyValuation: 200 }));
    component['createClient']();
    expect(customerServiceSpy.createCustomer).toHaveBeenCalledWith('Test', 100, 200);
    expect(component.customerUpdated.emit).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should call updateCustomer and emit customerUpdated and close', () => {
    spyOn(component.customerUpdated, 'emit');
    spyOn(component.close, 'emit');
    component['customer'] = { id: 1, name: 'Test', salary: 100, companyValuation: 200 };
    customerServiceSpy.updateCustomer.and.returnValue(of({ id: 1, name: 'Test', salary: 100, companyValuation: 200 }));
    component['updateCustomer']();
    expect(customerServiceSpy.updateCustomer).toHaveBeenCalledWith(1, 'Test', 100, 200);
    expect(component.customerUpdated.emit).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should call deleteCustomer, dispatch removeFromUser, and emit customerUpdated and close', () => {
    spyOn(component.customerUpdated, 'emit');
    spyOn(component.close, 'emit');
    component['customer'] = { id: 1, name: 'Test', salary: 100, companyValuation: 200 };
    customerServiceSpy.deleteCustomer.and.returnValue(of(void 0));
    component['deleteCustomer']();
    expect(storeSpy.dispatch).toHaveBeenCalled();
    expect(customerServiceSpy.deleteCustomer).toHaveBeenCalledWith(1);
    expect(component.customerUpdated.emit).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should reset customer when isNew is set to true', () => {
    component['customer'] = { id: 1, name: 'Test', salary: 100, companyValuation: 200 };
    component.isNew = true;
    expect(component['customer']).toEqual({ name: '', salary: 0, companyValuation: 0 });
  });

  it('should update customer on ngOnChanges', () => {
    const changes = {
      customerData: {
        currentValue: () => ({ id: 2, name: 'A', salary: 1, companyValuation: 2 }),
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    };
    spyOn(component, 'customerData').and.returnValue({ id: 2, name: 'A', salary: 1, companyValuation: 2 });
    component.ngOnChanges(changes as any);
    expect(component['customer']).toEqual({ id: 2, name: 'A', salary: 1, companyValuation: 2 });
  });
});
