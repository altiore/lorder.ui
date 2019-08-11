import React from 'react';

import { MenuItem, MenuList, Paper } from '@material-ui/core';

// import { useStyles } from './styles';

interface ITaskStatus {
  assignees: Array<{ id: number; userName: string; avatar?: string }>;
  onItemClick: (event: any) => any;
}

export const AssigneeList: React.FC<ITaskStatus> = ({ assignees, onItemClick }) => {
  // const classes = useStyles();

  return (
    <Paper>
      <MenuList>
        {assignees.map((assignee, index) => (
          <MenuItem
            key={index}
            value={assignee.id}
            // disabled={index === 2}
            // selected={index === 1}
            onClick={onItemClick}
          >
            {assignee.userName}
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};
