import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  public total = input<number>(0);
  public current = input<number>(0);
  public change = output<number>();

  protected readonly pages = signal<Page[]>([]);

  private readonly effect = effect(() => {
    const total = this.total();
    const current = this.current();
    const delta = 1;
    const range: Page[] = [];

    if (total <= 7) {
      for (let page = 1; page <= total; page++) {
        range.push(page);
      }
    } else {
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
    }

    this.pages.set(range);
  });

  protected goToPage(page: number | string) {
    if (typeof page === 'string') return;
    this.change.emit(page);
  }
}

type Page = number | string;
