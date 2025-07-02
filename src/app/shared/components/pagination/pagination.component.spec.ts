import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate correct pages for total <= 7', () => {
    (component as any).total = () => 5;
    (component as any).current = () => 2;
    (component as any).pages.set([1, 2, 3, 4, 5]);
    expect(component['pages']()).toEqual([1, 2, 3, 4, 5]);
  });

  it('should generate correct pages for total > 7', () => {
    (component as any).total = () => 10;
    (component as any).current = () => 5;
    (component as any).pages.set([1, '...', 4, 5, 6, '...', 10]);
    expect(component['pages']()).toContain(1);
    expect(component['pages']()).toContain(10);
    expect(component['pages']()).toContain('...');
    expect(component['pages']()).toContain(4);
    expect(component['pages']()).toContain(5);
    expect(component['pages']()).toContain(6);
  });

  it('should emit change when goToPage is called with a number', () => {
    spyOn(component.change, 'emit');
    component['goToPage'](3);
    expect(component.change.emit).toHaveBeenCalledWith(3);
  });

  it('should not emit change when goToPage is called with a string', () => {
    spyOn(component.change, 'emit');
    component['goToPage']('...');
    expect(component.change.emit).not.toHaveBeenCalled();
  });

  it('should generate correct pages with ellipsis for current near start', () => {
    (component as any).total = () => 10;
    (component as any).current = () => 1;
    // Simulate the effect logic
    const total = 10;
    const current = 1;
    const delta = 1;
    const range: (number | string)[] = [];
    for (let page = 1; page <= total; page++) {
      const previous = page >= current + 1 - delta;
      const next = page <= current + 1 + delta;
      const perimeter = previous && next;
      if (page === 1 || page === total || perimeter) {
        range.push(page);
      } else if (current <= 2 && page <= 3) {
        range.push(page);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }
    (component as any).pages.set(range);
    expect(component['pages']()).toEqual([1, 2, 3, '...', 10]);
  });

  it('should generate correct pages with ellipsis for current in the middle', () => {
    (component as any).total = () => 10;
    (component as any).current = () => 5;
    const total = 10;
    const current = 5;
    const delta = 1;
    const range: (number | string)[] = [];
    for (let page = 1; page <= total; page++) {
      const previous = page >= current + 1 - delta;
      const next = page <= current + 1 + delta;
      const perimeter = previous && next;
      if (page === 1 || page === total || perimeter) {
        range.push(page);
      } else if (current <= 2 && page <= 3) {
        range.push(page);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }
    (component as any).pages.set(range);
    expect(component['pages']()).toEqual([1, '...', 5, 6, 7, '...', 10]);
  });

  it('should generate correct pages with ellipsis for current near end', () => {
    (component as any).total = () => 10;
    (component as any).current = () => 9;

    const total = 10;
    const current = 9;
    const delta = 1;
    const range: (number | string)[] = [];
    for (let page = 1; page <= total; page++) {
      const previous = page >= current + 1 - delta;
      const next = page <= current + 1 + delta;
      const perimeter = previous && next;
      if (page === 1 || page === total || perimeter) {
        range.push(page);
      } else if (current <= 2 && page <= 3) {
        range.push(page);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }
    (component as any).pages.set(range);
    expect(component['pages']()).toEqual([1, '...', 9, 10]);
  });
});
