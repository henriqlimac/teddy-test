import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedCustomersComponent } from './selected-customers.component';
import { CustomerService } from '../../core/services/customer/customer.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('SelectedCustomersComponent', () => {
  let component: SelectedCustomersComponent;
  let fixture: ComponentFixture<SelectedCustomersComponent>;
  it('should fetch customers for valid ids', (done) => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    // ids: [1, 2, undefined, 3]
    storeSpy.select.and.returnValue(of([1, 2, undefined, 3]));
    const customerServiceSpy = {
      getCustomer: jasmine.createSpy('getCustomer').and.callFake((id: number) => of({ id, name: `Customer${id}` })),
    };
    (component as any).store = storeSpy;
    (component as any).customerService = customerServiceSpy;
    (component as any).fetchData();
    (component as any).customers$.subscribe((result: any) => {
      expect(result.length).toBe(3);
      expect(result).toEqual([
        { id: 1, name: 'Customer1' },
        { id: 2, name: 'Customer2' },
        { id: 3, name: 'Customer3' },
      ]);
      expect(customerServiceSpy.getCustomer).toHaveBeenCalledTimes(3);
      expect(customerServiceSpy.getCustomer).toHaveBeenCalledWith(1);
      expect(customerServiceSpy.getCustomer).toHaveBeenCalledWith(2);
      expect(customerServiceSpy.getCustomer).toHaveBeenCalledWith(3);
      done();
    });
  });

beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedCustomersComponent],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            getCustomer: () => of({}),
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

    fixture = TestBed.createComponent(SelectedCustomersComponent);
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

  it('should set customers$ to empty array if no ids', (done) => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    storeSpy.select.and.returnValue(of([]));
    (component as any).store = storeSpy;
    (component as any).customerService = { getCustomer: () => of({}) };
    (component as any).fetchData();
    (component as any).customers$.subscribe((result: any) => {
      expect(result).toEqual([]);
      done();
    });
  });

  it('should dispatch removeAll and call fetchData on clearAll', () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    (component as any).store = storeSpy;
    spyOn(component as any, 'fetchData');
    (component as any).clearAll();
    expect(storeSpy.dispatch).toHaveBeenCalled();
    expect((component as any).fetchData).toHaveBeenCalled();
  });
});
