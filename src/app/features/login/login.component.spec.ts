
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Store, useValue: { dispatch: () => {} } },
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch removeUser on ngOnInit', () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    (component as any).store = storeSpy;
    component.ngOnInit();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });

  it('should dispatch createUser and navigate on dispatchUser', () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    (component as any).store = storeSpy;
    (component as any).router = routerSpy;
    component.name = 'TestUser';
    component.dispatchUser();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({ name: 'TestUser', selected: [] }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/customers']);
  });
});
