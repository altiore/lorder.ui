import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import StartStopButton from '.';
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
          <p>задача на паузе (isPaused=true) и текущая (isCurrent=true)</p>
          <StartStopButton
            isPaused={true}
            isCurrent={true}
            onClickCenter={action('onClickCenter')}
            onClickLeft={action('onClickLeft')}
            onClickRight={action('onClickRight')}
          />

          <p>задача выполняется (не на паузе) (isPaused=false) и не текущая (isCurrent=false)</p>
          <StartStopButton
            isPaused={false}
            isCurrent={false}
            onClickCenter={action('onClickCenter')}
            onClickLeft={action('onClickLeft')}
            onClickRight={action('onClickRight')}
          />

          <p>задача на паузе (isPaused=true) и не текущая (isCurrent=false)</p>
          <StartStopButton
            isPaused={true}
            isCurrent={false}
            onClickCenter={action('onClickCenter')}
            onClickLeft={action('onClickLeft')}
            onClickRight={action('onClickRight')}
          />

          <p>задача выполняется (не на паузе) (isPaused=false) но текущая (isCurrent=true)</p>
          <StartStopButton
            isPaused={false}
            isCurrent={true}
            onClickCenter={action('onClickCenter')}
            onClickLeft={action('onClickLeft')}
            onClickRight={action('onClickRight')}
          />

          <br />
        </div>
      </div>
    );
  });
