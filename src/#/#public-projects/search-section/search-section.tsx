import React from 'react';

import SearchIcon from '@material-ui/icons/Search';

import Input from '@components/input';

import { useStyles } from './styles';

export const SearchSection = (props: any) => {
  const classes = useStyles();
  return (
    <div>
      <section style={{ marginTop: 56 }} className={classes.search}>
        <h1 className={classes.title}>Здесь нужно написать заголовок с призывом</h1>
        <h2 className={classes.subTitle}>Здесь нужно написать подзаголовок</h2>
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
