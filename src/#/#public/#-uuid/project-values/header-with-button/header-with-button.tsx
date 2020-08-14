import React, { memo } from 'react';

import ButtonEdit from '@components/button-edit';

import { useStyles } from './styles';

interface IHeaderWithTitleProps {
  title: string;
  buttonText: string;
  marginBottom?: number;
  marginTop?: number;
}

export const HeaderWithButton = memo(({ title, buttonText, marginBottom, marginTop }: IHeaderWithTitleProps) => {
  const classes = useStyles({ marginBottom, marginTop });
  return (
    <div className={classes.headerTitleWrap}>
      <h1 className={classes.headerTitle}>{title}</h1>
      <div className={classes.editButtonWrap}>
        <ButtonEdit routePath="/" variant="contained">
          {buttonText}
        </ButtonEdit>
      </div>
    </div>
  );
});
