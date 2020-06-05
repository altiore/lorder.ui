import React from 'react';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

import { useStyles } from './styles';

interface IValueDescriptionCard {
  title: string;
  children: string;
}

export const ValueDescriptionCard = ({ title, children }: IValueDescriptionCard) => {
  const classes = useStyles();
  return (
    <div className={classes.cardWrap}>
      <StarRateRoundedIcon className={classes.cardIconWrap} />
      <h2 className={classes.cardTitle}>{title}</h2>
      <p className={classes.cardDescription}>{children}</p>
    </div>
  );
};
