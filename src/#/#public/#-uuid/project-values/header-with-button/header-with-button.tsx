import React, { memo } from 'react';

import ButtonEdit from '@components/button-edit';

import { useStyles } from './styles';

interface IHeaderWithTitleProps {
  title: string;
  buttonText: string;
  marginBottom?: number;
  marginTop?: number;
  to?: string;
}

export const HeaderWithButton = memo(({ title, buttonText, marginBottom, marginTop, to }: IHeaderWithTitleProps) => {
  const classes = useStyles({ marginBottom, marginTop });
  return (
    <div className={classes.headerTitleWrap}>
      <h1 className={classes.headerTitle}>{title}</h1>
      <div className={classes.editButtonWrap}>
        {Boolean(to) && (
          <ButtonEdit to={to} variant="contained">
            {buttonText}
          </ButtonEdit>
        )}
      </div>
    </div>
  );
});
