export interface IStreamersQuery {
  page: number;
  limit: number;
  searchKeyword?: string;
  sortOrder?: 'newest' | 'oldest' | 'atoz' | 'ztoa';
}
