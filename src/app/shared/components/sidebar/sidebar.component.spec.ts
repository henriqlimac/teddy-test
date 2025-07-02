
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { ActivatedRoute } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close when onClose is called', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should have routes defined', () => {
    expect(component.routes).toBeDefined();
    expect(Array.isArray(component.routes)).toBeTrue();
  });

  it('should have arrowLeftIcon defined', () => {
    expect(component.arrowLeftIcon).toBeDefined();
  });
});
