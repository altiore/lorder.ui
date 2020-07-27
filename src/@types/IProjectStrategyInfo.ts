export interface IDetailedRole {
  id: string;
  title: string;
  order: number;
  createdStatus: string;
  columns: any[];
}

export interface IProjectStrategyInfo {
  strategy: string;
  userRoles: IDetailedRole[];
}
