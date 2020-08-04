import React from 'react';

import Grid from '@material-ui/core/Grid';

import Block from '#/#hi/#/@common/block';
import ScreenTitle from '#/#hi/#/@common/screen-title';

import Item from './item';
import { ReactComponent as LorderSvg } from './lorder_2.svg';
import { useStyles } from './styles';

interface ScreenServicesI {
  name: string;
  texts: string[];
}

const ScreenServices: React.FC<ScreenServicesI> = ({ name, texts }) => {
  const classes = useStyles();

  return (
    <Block name={name} className={classes.content}>
      <ScreenTitle>Что позволяет наш сервис?</ScreenTitle>
      <Grid item md={1} xs={false} />
      <Grid item className={classes.svgIconBlock} md={5} xs={12}>
        <LorderSvg />
      </Grid>
      <Grid item className={classes.blockTexts} md={5} xs={12}>
        {texts.map((itemText, index) => (
          <Item key={index}>{itemText}</Item>
        ))}
      </Grid>
      <Grid item md={1} xs={false} />
      <div className={classes.backTitle}>LORDER</div>
    </Block>
  );
};

export default ScreenServices;
