import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from '../styles';

interface IGroupFooter {
  members: any[];
  searchCallback: (value: any) => void;
}

export const GroupFooter = memo(({ members, searchCallback }: IGroupFooter) => {
  const classes = useStyles();
  return (
    <Grid container justify="space-between" alignItems="center" className={classes.searchGroupWrap}>
      <span>
        <b>{members.length}</b>
      </span>
      <TextField
        className={classes.searchInput}
        variant="standard"
        onChange={searchCallback}
        placeholder="Найти участника по имени"
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon classes={{ root: classes.searchIcon }} />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
});
