import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import MegaButton from '.';
import CenterDecorator from '../../../.storybook/decor/Center';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: 500,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 200,
    padding: theme.spacing(2),
  },
}));

storiesOf('MegaButton', module)
  .addDecorator(CenterDecorator)
  .add('default', () => {
    const { form, root } = useStyles();
    return (
      <div className={root}>
        <div className={form}>
          <MegaButton onClickCenter={action('onClickCenter')} />

          <br />

          <MegaButton onClickCenter={action('onClickCenter')} onClickLeft={action('onClickLeft')} />

          <br />

          <MegaButton
            onClickCenter={action('onClickCenter')}
            onClickLeft={action('onClickLeft')}
            onClickRight={action('onClickRight')}
          />
        </div>
      </div>
    );
  });
