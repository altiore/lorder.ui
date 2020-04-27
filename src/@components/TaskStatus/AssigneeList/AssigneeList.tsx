import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';

import { IUser } from '@types';

// import { useStyles } from './styles';

interface ITaskStatus {
  assignees: IUser[];
  onItemClick: (event: any) => any;
}

export const AssigneeList: React.FC<ITaskStatus> = ({ assignees, onItemClick }) => {
  // const classes = useStyles();

  return (
    <Paper>
      <MenuList>
        {assignees.map((assignee, index) => (
          <MenuItem key={index} value={assignee.id} onClick={onItemClick}>
            <ListItemAvatar>
              <Avatar alt={assignee.userName} src={assignee.avatarUrl}>
                {assignee.avatarUrl ? undefined : assignee.shortName}
              </Avatar>
            </ListItemAvatar>
            {assignee.userName}
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};
