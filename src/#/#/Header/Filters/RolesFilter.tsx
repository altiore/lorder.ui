import React, { useMemo, useState } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { IProjectRole } from '@types';

const useStyles = makeStyles((theme: Theme) => ({
  selectRole: {
    background: '#fff',
  },
}));

interface IRolesFilterProps {
  roles: IProjectRole[];
  projectRoles: string[];
}

const RolesFilter: React.FC<IRolesFilterProps> = ({ roles, projectRoles }) => {
  const userRoles = useMemo(() => roles.filter(role => projectRoles.includes(role.id)), [projectRoles, roles]);
  const [select, setSelect] = useState('role');
  const classes = useStyles();
  const handleSelectProjectPart = ({ target: { value } }) => {
    setSelect(value);
  };

  return (
    <Select
      className={classes.selectRole}
      value={select}
      onChange={handleSelectProjectPart}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
    >
      <MenuItem value="role" disabled>
        По ролям
      </MenuItem>
      {userRoles.map(role => {
        return (
          <MenuItem key={role.id} value={role.id}>
            {role.name}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default RolesFilter;
