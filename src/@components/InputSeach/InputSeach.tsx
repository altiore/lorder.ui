import React from 'react';

import classNames from 'classnames';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './styles';

interface IInputSearchProps {
  placeholder?: string;
  searchCallback: (value: any) => void;
  variant?: 'Centered';
}

export const InputSearch = ({ placeholder, searchCallback, variant }: IInputSearchProps) => {
  const classes = useStyles();
  return (
    <TextField
      variant="standard"
      onChange={searchCallback}
      placeholder={placeholder}
      className={classes.searchInput}
      InputProps={{
        classes: {
          input: variant ? classes[`searchInput${variant}`] : classes.searchInput,
        },
        startAdornment: (
          <InputAdornment position="end" classes={{ root: classes.InputAdornment }}>
            <SearchIcon
              classes={{
                root: variant ? classNames(classes.searchIcon, classes[`searchIcon${variant}`]) : classes.searchIcon,
              }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
