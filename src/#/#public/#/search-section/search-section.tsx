import React from 'react';

import T from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

import Input from '@components/input';

import { useStyles } from './styles';

export const SearchSection = () => {
  const classes = useStyles();
  return (
    <div>
      <section className={classes.search}>
        <T variant="h1" className={classes.title}>
          Найди проект и стань его участником
        </T>
        <div className={classes.inputWrap}>
          <Input
            icon={<SearchIcon />}
            className={classes.input}
            variant="outlined"
            inputProps={{ style: { borderRadius: 15 } }}
            placeholder="Найти проект по названию"
          />
        </div>
      </section>
    </div>
  );
};
