import React, { useMemo } from 'react';

import T from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

import Input from '@components/input';

import { useStyles } from './styles';

interface IProps {
  onChange: any;
}

export const SearchSection: React.FC<IProps> = ({ onChange }): JSX.Element => {
  const inputProps = useMemo(() => ({ style: { borderRadius: 15 } }), []);

  const { input, inputWrap, search, title } = useStyles();
  return (
    <div>
      <section className={search}>
        <T variant="h1" className={title}>
          Найди проект и стань его участником
        </T>
        <div className={inputWrap}>
          <Input
            onChange={onChange}
            icon={<SearchIcon />}
            className={input}
            variant="outlined"
            inputProps={inputProps}
            fullWidth
            placeholder="Найти проект по названию"
          />
        </div>
      </section>
    </div>
  );
};
