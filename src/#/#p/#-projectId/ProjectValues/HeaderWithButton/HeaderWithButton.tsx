import React from 'react';

import ButtonEdit from '@components/ButtonEdit';

import { useStyles } from './styles';

interface IHeaderWithTitleProps {
  title: string;
  buttonText: string;
  marginBottom?: number;
  marginTop?: number;
}

export const HeaderWithButton = ({ title, buttonText, marginBottom, marginTop }: IHeaderWithTitleProps) => {
  const classes = useStyles({ marginBottom, marginTop });
  return (
    <div className={classes.headerTitleWrap}>
      <h1 className={classes.headerTitle}>{title}</h1>
      <div className={classes.editButtonWrap}>
        <ButtonEdit routePath="/" variant="Gray">
          {buttonText}
        </ButtonEdit>
      </div>
    </div>
  );
};
