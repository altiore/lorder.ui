import React, { useCallback, useEffect, useMemo } from 'react';

import minBy from 'lodash/minBy';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { IDetailedRole } from '@types';

const useStyles = makeStyles((theme: Theme) => ({
  selectRole: {
    background: '#fff',
  },
}));

interface IRolesFilterProps {
  changeFilter: any;
  selectedRole?: string;
  userRoles: IDetailedRole[];
}

const FILTER_TYPE = 'selectedRole';

export const RolesFilter: React.FC<IRolesFilterProps> = ({ changeFilter, selectedRole, userRoles }) => {
  const role: string | undefined = useMemo(() => {
    if (selectedRole && userRoles.find(el => el.id === selectedRole)) {
      return selectedRole;
    }

    return userRoles && minBy(userRoles, 'order')?.id;
  }, [selectedRole, userRoles]);

  useEffect(() => {
    if (selectedRole !== role) {
      changeFilter(FILTER_TYPE, role);
    }
  }, [changeFilter, role, selectedRole]);

  const handleChange = useCallback(
    (evt: any) => {
      changeFilter(FILTER_TYPE, evt?.target?.value);
    },
    [changeFilter]
  );

  const { selectRole } = useStyles();
  if (!role) {
    return null;
  }

  return (
    <Select className={selectRole} value={role} onChange={handleChange} inputProps={{ 'aria-label': 'Фильтр роли' }}>
      {userRoles.map(({ id, title }) => {
        return (
          <MenuItem key={id} value={id}>
            {title}
          </MenuItem>
        );
      })}
    </Select>
  );
};
