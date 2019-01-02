import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

const moment = require('moment');

import { DailyRoutine } from './DailyRoutine';

const startJob = moment().subtract(5, 'hours');

const events = [
  {
    data: 1,
    finishAt: startJob,
    name: 'Сон',
    startAt: moment()
      .subtract(1, 'day')
      .set('hours', 23),
  },
  {
    data: 2,
    finishAt: moment().subtract(1, 'hours'),
    name: 'Работа',
    startAt: startJob,
  },
];

storiesOf('DailyRoutine', module).add('default', () => (
  <DailyRoutine events={events} onChange={action('onEventsChange')} />
));
