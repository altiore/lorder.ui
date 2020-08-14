import React, { memo } from 'react';

import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';

import InputSeach from '@components/input-search';

import { useStyles } from '../styles';

interface IGroupFooter {
  members: any[];
  searchCallback: (value: any) => void;
}

export const GroupFooter = memo(({ members, searchCallback }: IGroupFooter) => {
  const { rowCell, usersQuantity, searchGroupWrap } = useStyles();
  return (
    <Grid container justify="space-between" alignItems="center" className={searchGroupWrap}>
      <span className={classNames(rowCell, usersQuantity)}>{members.length}</span>
      <InputSeach searchCallback={searchCallback} placeholder={'Найти участника по имени'} />
    </Grid>
  );
});
