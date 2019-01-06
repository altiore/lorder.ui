import * as React from 'react';

import { ROLE } from 'src/@types';

export interface ICheckRoleProps {
  children: any;
  role: ROLE | ROLE[];
  userRole: ROLE;
}

export const CheckRoleTsx: React.FunctionComponent<ICheckRoleProps> = ({ children, role, userRole }) => {
  const roles = Array.isArray(role) ? role : [role];
  if (~roles.indexOf(userRole)) {
    return children;
  }
  return null;
};
