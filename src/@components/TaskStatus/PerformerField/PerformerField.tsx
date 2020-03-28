import React, { useMemo } from 'react';

import get from 'lodash/get';

import { Avatar, ButtonBase } from '@material-ui/core';

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

  return (
    <ButtonBase
      className={classes.avatarWrapper}
      aria-owns={open ? 'menu-list-grow' : undefined}
      aria-haspopup="true"
      onClick={assigneeListToggle}
    >
      <Avatar className={classes.avatar} src={get(currentUser, ['avatar', 'url'])}>
        {get(currentUser, 'shortName', '--')}
      </Avatar>
    </ButtonBase>
  );
};
