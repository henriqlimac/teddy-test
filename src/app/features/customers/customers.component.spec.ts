import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomersComponent } from './customers.component';
import { CustomerService } from '../../core/services/customer/customer.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersComponent],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            getAll: () => of({ clients: [], currentPage: 0, totalPages: 0 }),
          },
        },
        {
          provide: Store,
          useValue: {
            select: () => of([]),
            dispatch: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchData on ngOnInit', () => {
    spyOn(component as any, 'fetchData');
    (component as any).ngOnInit();
    expect((component as any).fetchData).toHaveBeenCalled();
  });

  it('should set isNew, isDeleting, customerData, and isModalOpen on newClient', () => {
    component['isNew'] = false;
    component['isDeleting'] = true;
    component['customerData'] = { name: 'A', salary: 1, companyValuation: 2 };
    component['isModalOpen'] = false;
    (component as any).newClient();
    expect(component['isNew']).toBeTrue();
    expect(component['isDeleting']).toBeFalse();
    expect(component['customerData']).toEqual(component['defaultData']);
    expect(component['isModalOpen']).toBeTrue();
  });

  it('should set isNew, isDeleting, customerData, and isModalOpen on updateCustomer', () => {
    const customer = { id: 1, name: 'B', salary: 2, companyValuation: 3 };
    (component as any).updateCustomer(customer);
    expect(component['isNew']).toBeFalse();
    expect(component['isDeleting']).toBeFalse();
    expect(component['customerData']).toBe(customer);
    expect(component['isModalOpen']).toBeTrue();
  });

  it('should set isNew, isDeleting, customerData, and isModalOpen on deleteCustomer', () => {
    const customer = { id: 2, name: 'C', salary: 3, companyValuation: 4 };
    (component as any).deleteCustomer(customer);
    expect(component['isNew']).toBeFalse();
    expect(component['isDeleting']).toBeTrue();
    expect(component['customerData']).toBe(customer);
    expect(component['isModalOpen']).toBeTrue();
  });

  it('should call goToPage(1) on sizeChanged', () => {
    spyOn(component, 'goToPage');
    component.sizeChanged();
    expect(component.goToPage).toHaveBeenCalledWith(1);
  });

  it('should call fetchData and set currentPage on goToPage', () => {
    spyOn(component as any, 'fetchData');
    (component as any).goToPage(3);
    expect((component as any).fetchData).toHaveBeenCalledWith(3);
    expect(component['currentPage']).toBe(3);
  });
});
