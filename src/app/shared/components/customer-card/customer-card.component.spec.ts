import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CustomerCardComponent } from './customer-card.component';

describe('CustomerCardComponent', () => {
  let component: CustomerCardComponent;
  let fixture: ComponentFixture<CustomerCardComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    storeSpy.select.and.returnValue(of([1, 2]));

    await TestBed.configureTestingModule({
      imports: [CustomerCardComponent],
      providers: [{ provide: Store, useValue: storeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete when deleteCustomer is called', () => {
    spyOn(component.delete, 'emit');
    const customer = { id: 1, name: 'Test', salary: 100, companyValuation: 200 };
    component['deleteCustomer'](customer);
    expect(component.delete.emit).toHaveBeenCalledWith(customer);
  });

  it('should emit update when updateCustomer is called', () => {
    spyOn(component.update, 'emit');
    const customer = { id: 1, name: 'Test', salary: 100, companyValuation: 200 };
    component['updateCustomer'](customer);
    expect(component.update.emit).toHaveBeenCalledWith(customer);
  });

  it('should dispatch addToUser when selectCustomer is called', () => {
    component['selectCustomer'](1);
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });

  it('should dispatch removeFromUser and emit changed when deselectCustomer is called', () => {
    spyOn(component.changed, 'emit');
    component['deselectCustomer'](1);
    expect(storeSpy.dispatch).toHaveBeenCalled();
    expect(component.changed.emit).toHaveBeenCalled();
  });

  it('should return true for isSelected if id is in selectedIds', () => {
    component['selectedIds'] = [1, 2, 3];
    expect(component['isSelected'](2)).toBeTrue();
  });

  it('should return false for isSelected if id is not in selectedIds', () => {
    component['selectedIds'] = [1, 2, 3];
    expect(component['isSelected'](5)).toBeFalse();
  });
});
