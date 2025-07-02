import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { LucideAngularModule, Minus, Pen, Plus, Trash2 } from 'lucide-angular';
import { Observable, of } from 'rxjs';
import { Customer } from '../../../core/models';
import { addToUser, removeFromUser, selectUserSelected } from '../../store';
import { IUserState } from '../../store/user.state';

@Component({
  selector: 'app-customer-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss',
})
export class CustomerCardComponent implements OnInit {
  private selectedCustomers$: Observable<IUserState['selected']> = of([]);
  private selectedIds: number[] = [];

  private readonly store = inject(
    Store<{ selectedCount: IUserState['selected'] }>
  );

  protected readonly Minus = Minus;
  protected readonly Plus = Plus;
  protected readonly Pen = Pen;
  protected readonly Trash = Trash2;

  public customer = input<Customer>();
  public showActions = input<boolean | undefined>();
  public delete = output<Customer>();
  public update = output<Customer>();
  public customerDeleted = output<void>();
  public changed = output<void>();

  public ngOnInit(): void {
    this.selectedCustomers$ = this.store.select(selectUserSelected);
    this.selectedCustomers$.subscribe((ids) => {
      this.selectedIds = ids.filter((id): id is number => id !== undefined);
    });
  }

  protected isSelected(id: number | undefined): boolean {
    if (id === undefined) return false;
    return this.selectedIds.includes(id);
  }

  protected selectCustomer(id: number | undefined) {
    if (id == undefined) return;
    this.store.dispatch(addToUser({ payload: id }));
  }

  protected deselectCustomer(id: number | undefined) {
    if (id == undefined) return;
    this.store.dispatch(removeFromUser({ payload: id }));
    this.changed.emit();
  }

  protected updateCustomer(customer: Customer | undefined) {
    if (customer == undefined) return;
    this.update.emit(customer);
  }

  protected deleteCustomer(customer: Customer | undefined) {
    if (customer == null) return;
    this.delete.emit(customer);
  }
}
