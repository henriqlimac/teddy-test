import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer, Page } from '../../models';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'https://boasorte.teddybackoffice.com.br';

  public getAll(page: number = 0, limit: number = 16) {
    return this.httpClient.get<Page<Customer>>(`${this.apiUrl}/users`, {
      params: { page, limit },
    });
  }

  public getCustomer(id: number) {
    return this.httpClient.get<Customer>(`${this.apiUrl}/users/${id}`);
  }

  public createCustomer(
    name: string,
    salary: number,
    companyValuation: number
  ) {
    return this.httpClient.post<Customer>(`${this.apiUrl}/users`, {
      name,
      salary,
      companyValuation,
    });
  }

  public deleteCustomer(id: number) {
    return this.httpClient.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  public updateCustomer(
    id: number,
    name: string,
    salary: number,
    companyValuation: number
  ) {
    return this.httpClient.patch<Customer>(`${this.apiUrl}/users/${id}`, {
      name,
      salary,
      companyValuation,
    });
  }
}
