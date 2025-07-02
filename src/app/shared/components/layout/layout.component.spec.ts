import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [
        {
          provide: Store,
          useValue: {
            select: () => of({ name: 'Test User' }),
            dispatch: () => {},
          },
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isSidebarOpen to true when header emits isSidebarOpen', () => {
    component.isSidebarOpen = false;
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('app-header');
    header.dispatchEvent(new CustomEvent('isSidebarOpen'));
    fixture.detectChanges();
    expect(component.isSidebarOpen).toBeTrue();
  });

  it('should set isSidebarOpen to false when sidebar emits close', () => {
    component.isSidebarOpen = true;
    fixture.detectChanges();
    const sidebar = fixture.nativeElement.querySelector('app-sidebar');
    sidebar.dispatchEvent(new CustomEvent('close'));
    fixture.detectChanges();
    expect(component.isSidebarOpen).toBeFalse();
  });
});
