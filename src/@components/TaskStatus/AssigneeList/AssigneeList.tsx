import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { IUser } from '@types';

interface ITaskStatus {
  assignees: IUser[];
  onItemClick: (event: any) => any;
}

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  listItemAvatar: {
    minWidth: theme.spacing(6),
  },
}));

export const AssigneeList: React.FC<ITaskStatus> = ({ assignees, onItemClick }) => {
  const { avatar, listItemAvatar } = useStyles();

  return (
    <Paper>
      <MenuList>
        {assignees.map((assignee, index) => (
          <MenuItem key={index} value={assignee.id} onClick={onItemClick}>
            <ListItemAvatar classes={{ root: listItemAvatar }}>
              <Avatar alt={assignee.userName} src={assignee.avatarUrl} className={avatar}>
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
