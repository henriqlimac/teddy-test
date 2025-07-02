import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'lucide-angular';
import { of } from 'rxjs';
import routes from '../../consts/routes.const';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select']);
    storeSpy.select.and.returnValue(of({ name: 'Test User' }));


    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have MenuIcon set to Menu', () => {
    expect(component.MenuIcon).toBe(Menu);
  });

  it('should have routes defined', () => {
    expect(component.routes).toBe(routes);
  });

  it('should emit isSidebarOpen when openSidebar is called', () => {
    spyOn(component.isSidebarOpen, 'emit');
    component.openSidebar();
    expect(component.isSidebarOpen.emit).toHaveBeenCalled();
  });
});
