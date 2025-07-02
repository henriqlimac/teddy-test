import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAll', () => {
    service.getAll(1, 10).subscribe();
    const req = httpMock.expectOne(req => req.method === 'GET' && req.url.includes('/users'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('limit')).toBe('10');
    req.flush({ clients: [], currentPage: 1, totalPages: 1 });
  });

  it('should call getCustomer', () => {
    service.getCustomer(5).subscribe();
    const req = httpMock.expectOne(`${service['apiUrl']}/users/5`);
    expect(req.request.method).toBe('GET');
    req.flush({ id: 5, name: 'Test', salary: 100, companyValuation: 200 });
  });

  it('should call createCustomer', () => {
    service.createCustomer('A', 100, 200).subscribe();
    const req = httpMock.expectOne(`${service['apiUrl']}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'A', salary: 100, companyValuation: 200 });
    req.flush({ id: 1, name: 'A', salary: 100, companyValuation: 200 });
  });

  it('should call deleteCustomer', () => {
    service.deleteCustomer(7).subscribe();
    const req = httpMock.expectOne(`${service['apiUrl']}/users/7`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should call updateCustomer', () => {
    service.updateCustomer(2, 'B', 200, 300).subscribe();
    const req = httpMock.expectOne(`${service['apiUrl']}/users/2`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ name: 'B', salary: 200, companyValuation: 300 });
    req.flush({ id: 2, name: 'B', salary: 200, companyValuation: 300 });
  });
});
