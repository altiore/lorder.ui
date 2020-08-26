import React from 'react';

import cn from 'classnames';
import { WrappedFieldProps } from 'redux-form';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { SelectField } from '@components/select-field';

import { IProjectRole } from '@types';

interface IProps extends WrappedFieldProps {
  items: IProjectRole[];
  vertical: boolean;
}

const getTitle = el => el?.role?.name || 'N/A';
const getId = el => el?.roleId;

export const RoleSelectTsx = ({ input, items, vertical, ...rest }: IProps) => {
  const { select, selectVertical } = useStyles();

  if (!items || !items.length) {
    return null;
  }

  return (
    <SelectField
      label="Роль"
      getId={getId}
      getTitle={getTitle}
      input={input}
      items={items}
      className={cn(select, {
        [selectVertical]: vertical,
      })}
      {...rest}
    />
  );
};

export const useStyles = makeStyles((theme: Theme) => ({
  select: {
    height: 50,
    width: 275,
    [theme.breakpoints.down('sm')]: {
      margin: '20px 0',
    },
  },
  selectVertical: {
    maxWidth: 360,
    width: '100%',
  },
}));
