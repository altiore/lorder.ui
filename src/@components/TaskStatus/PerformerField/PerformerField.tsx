import React, { useMemo } from 'react';

import get from 'lodash/get';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';

import { WrappedFieldProps } from 'redux-form';

import { useStyles } from './styles';

interface IPerformerField extends WrappedFieldProps {
  assigneeListToggle?: any;
  assignees: Array<{ id: number; userName: string; avatar?: string }>;
  open: boolean;
}

export const PerformerField: React.FC<IPerformerField> = ({ assigneeListToggle, assignees, input, open }) => {
  const classes = useStyles();

  const currentUser = useMemo(() => {
    return assignees.find(el => el.id === input.value);
  }, [assignees, input.value]);

  const shortName = useMemo(() => get(currentUser, 'shortName', '--'), [currentUser]);

  const userName = useMemo(() => get(currentUser, 'userName', '--'), [currentUser]);

  const avatarUrl = useMemo(() => get(currentUser, ['avatar', 'url']), [currentUser]);

  return (
    <ButtonBase
      className={classes.avatarWrapper}
      aria-owns={open ? 'menu-list-grow' : undefined}
      aria-haspopup="true"
      onClick={assigneeListToggle}
    >
      <Tooltip title={userName}>
        <Avatar className={classes.avatar} src={avatarUrl}>
          {shortName}
        </Avatar>
      </Tooltip>
    </ButtonBase>
  );
};
