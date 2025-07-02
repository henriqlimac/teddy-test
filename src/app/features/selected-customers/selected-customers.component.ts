import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { Customer } from '../../core/models';
import { CustomerService } from '../../core/services/customer/customer.service';
import { CustomerCardComponent } from '../../shared/components/customer-card/customer-card.component';
import { removeAll } from '../../shared/store/user.actions';
import { selectUserSelected } from '../../shared/store/user.selectors';

@Component({
  selector: 'app-selected-customers',
  imports: [CommonModule, CustomerCardComponent],
  templateUrl: './selected-customers.component.html',
  styleUrl: './selected-customers.component.scss',
})
export class SelectedCustomersComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  private readonly store = inject(Store);
  protected customers$: Observable<Customer[]> = of([]);

  public ngOnInit() {
    this.fetchData();
  }

  protected fetchData() {
    this.customers$ = this.store.select(selectUserSelected).pipe(
      switchMap((ids) => {
        if (!ids.length) return of([]);
        const validIds = ids.filter((id): id is number => id !== undefined);
        if (!validIds.length) return of([]);
        const requests = validIds.map((id) =>
          this.customerService.getCustomer(id)
        );
        return forkJoin(requests);
      })
    );
  }

  protected clearAll() {
    this.store.dispatch(removeAll());
    this.fetchData();
  }
}
