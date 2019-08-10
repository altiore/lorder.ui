import React from 'react';

import { MenuItem, MenuList, Paper } from '@material-ui/core';

// import { useStyles } from './styles';

interface ITaskStatus {
  options: any[];
  onItemClick: (event: any) => any;
}

export const AssigneeList: React.FC<ITaskStatus> = ({ options, onItemClick }) => {
  // const classes = useStyles();

  return (
    <Paper>
      <MenuList>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={index}
            // disabled={index === 2}
            selected={index === 1}
            onClick={onItemClick}
          >
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};
