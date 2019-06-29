import React from 'react';

import { ROLE } from '@types';

export interface ICheckRoleProps {
  children: any;
  role: ROLE | ROLE[];
  userRole: undefined | ROLE;
}

const CheckRoleTsx: React.FC<ICheckRoleProps> = ({ children, role, userRole }) => {
  if (!role) {
    return null;
  }
  const roles = Array.isArray(role) ? role : [role];
  if (userRole && ~roles.indexOf(userRole)) {
    return children;
  }
  return null;
};

export default CheckRoleTsx;
