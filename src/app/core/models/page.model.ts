export interface Page<T> {
  clients: Array<T>;
  totalPages: number;
  currentPage: number;
}
