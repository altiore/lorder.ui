export interface IListDto<OrderBy = string> {
  count?: number;
  startId?: number;
  endId?: number;
  orderBy?: OrderBy;
  order?: 'asc' | 'desc';
}
