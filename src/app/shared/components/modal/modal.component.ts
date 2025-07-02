import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LucideAngularModule, X } from 'lucide-angular';
import { Customer } from '../../../core/models';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { removeFromUser } from '../../store';
import { IUserState } from '../../store/user.state';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnChanges {
  private readonly customerService = inject(CustomerService);
  private readonly defaultContent = {
    name: '',
    salary: 0,
    companyValuation: 0,
  };

  public readonly show = input<boolean>(false);
  public readonly close = output<void>();
  public readonly isDeleting = input<boolean>(false);
  public readonly customerUpdated = output<void>();
  public readonly customerData = input<Customer>(this.defaultContent);
  public readonly content = signal<Customer>(this.defaultContent);

  protected readonly X = X;
  protected customer: Customer = this.defaultContent;

  private readonly store = inject(
    Store<{ selectedCount: IUserState['selected'] }>
  );

  private internalNew: boolean = false;

  @Input()
  public set isNew(value: boolean) {
    this.internalNew = value;
    if (!value) return;
    this.resetCustomer();
  }

  public get isNew() {
    return this.internalNew;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['customerData']) return;
    this.customer = {
      id: this.customerData().id,
      name: this.customerData().name,
      salary: this.customerData().salary,
      companyValuation: this.customerData().companyValuation,
    };
  }

  protected onClose() {
    this.close.emit();
  }

  protected createClient() {
    if (
      this.customer.name == null ||
      this.customer.salary == null ||
      this.customer.companyValuation == null
    ) {
      return;
    }
    this.customerService
      .createCustomer(
        this.customer.name,
        this.customer.salary,
        this.customer.companyValuation
      )
      .subscribe((response) => {
        this.content.set(response);
      })
      .add(() => this.customerUpdated.emit());
    this.close.emit();
  }

  protected updateCustomer() {
    if (
      this.customer.id == null ||
      this.customer.name == null ||
      this.customer.salary == null ||
      this.customer.companyValuation == null
    ) {
      return;
    }
    this.customerService
      .updateCustomer(
        this.customer.id,
        this.customer.name,
        this.customer.salary,
        this.customer.companyValuation
      )
      .subscribe((response) => {
        this.content.set(response);
      })
      .add(() => this.customerUpdated.emit());
    this.close.emit();
  }

  protected deleteCustomer() {
    if (this.customer.id == undefined) return;
    this.store.dispatch(removeFromUser({ payload: this.customer.id }));
    this.customerService
      .deleteCustomer(this.customer.id)
      .subscribe()
      .add(() => this.customerUpdated.emit());
    this.close.emit();
  }

  private resetCustomer() {
    this.customer = this.defaultContent;
  }
}
