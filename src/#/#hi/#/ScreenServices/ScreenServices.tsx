import React from 'react';

import Grid from '@material-ui/core/Grid';

import Block from '#/#hi/#/@common/Block';
import ScreenTitle from '#/#hi/#/@common/ScreenTitle';

import Item from './Item';
import { ReactComponent as LorderSvg } from './Lorder_2.svg';
import { useStyles } from './styles';

interface ScreenServicesI {
  name: string;
  texts: {
    adv1: string;
    adv2: string;
    adv3: string;
    adv4: string;
    adv5: string;
    adv6: string;
    adv7: string;
  };
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
        <Item key={1}>{texts.adv1}</Item>
        <Item key={2}>{texts.adv2}</Item>
        <Item key={3}>{texts.adv3}</Item>
        <Item key={4}>{texts.adv4}</Item>
        <Item key={5}>{texts.adv5}</Item>
        <Item key={6}>{texts.adv6}</Item>
        <Item key={7}>{texts.adv7}</Item>
      </Grid>
      <Grid item md={1} xs={false} />
      <div className={classes.backTitle}>LORDER</div>
    </Block>
  );
};

export default ScreenServices;
