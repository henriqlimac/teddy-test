import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, RotateCw } from 'lucide-angular';
import { Customer, Page } from '../../core/models';
import { CustomerService } from '../../core/services/customer/customer.service';
import { CustomerCardComponent } from '../../shared/components/customer-card/customer-card.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-customers',
  imports: [
    CommonModule,
    FormsModule,
    CustomerCardComponent,
    ModalComponent,
    PaginationComponent,
    LucideAngularModule,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  private readonly customerService = inject(CustomerService);

  protected readonly defaultContent = {
    clients: [],
    currentPage: 0,
    totalPages: 0,
  };
  protected readonly defaultData = { name: '', salary: 0, companyValuation: 0 };
  protected readonly content = signal<Page<Customer>>(this.defaultContent);
  protected customerData: Customer = this.defaultData;
  protected currentPage = 1;
  protected pageSize = 12;
  protected isModalOpen = false;
  protected isNew = false;
  protected isDeleting = false;
  protected isLoading = true;
  protected rotateIcon = RotateCw;

  public ngOnInit(): void {
    this.fetchData();
  }

  protected fetchData(currentPage: number = 0) {
    this.customerService
      .getAll(currentPage, this.pageSize)
      .subscribe((response) => {
        this.content.set(response);
      })
      .add(() => (this.isLoading = false));
  }

  protected newClient() {
    this.isNew = true;
    this.isDeleting = false;
    this.customerData = this.defaultData;
    this.isModalOpen = true;
  }

  protected updateCustomer(customer: Customer) {
    this.isNew = false;
    this.isDeleting = false;
    this.customerData = customer;
    this.isModalOpen = true;
  }

  protected deleteCustomer(customer: Customer) {
    this.isNew = false;
    this.isDeleting = true;
    this.customerData = customer;
    this.isModalOpen = true;
  }

  public sizeChanged() {
    this.goToPage(1);
  }

  public goToPage(page: number) {
    this.fetchData(page);
    this.currentPage = page;
  }
}
