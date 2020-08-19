import React from 'react';

import { TimeLine } from '.';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { IEvent, ITask, IUserWork } from '@types';

const moment = require('moment');

const startJob = moment().subtract(5, 'hours');
const startJob3 = moment().subtract(1, 'hours');

const events: IEvent[] = [
  {
    userWork: {
      finishAt: startJob,
      startAt: moment()
        .subtract(1, 'day')
        .set('hours', 23),
    } as IUserWork,

    task: {} as ITask,

    isActive: false,
    name: 'Сон',
  },
  {
    userWork: {
      finishAt: startJob3,
      startAt: startJob,
    } as IUserWork,

    task: {} as ITask,

    isActive: true,
    name: 'Работа',
  },
  {
    isActive: true,
    name: 'Работа вторая',
    task: {} as ITask,
    userWork: {
      finishAt: null,
      startAt: startJob3,
    } as IUserWork,
  },
];

storiesOf('TimeLine', module)
  .add('default', () => (
    <div style={{ backgroundColor: '#fff', width: '98%', margin: '100px auto', padding: 8 }}>
      <TimeLine
        currentRange={[moment().startOf('day'), moment()]}
        currentTime={'22:15'}
        events={events}
        onTimelineClick={action('onTimelineClick')}
        patchUserWork={action('patchUserWork') as any}
      />
    </div>
  ))
  .add('fullSize', () => (
    <div style={{ backgroundColor: '#fff', width: '98%', margin: '100px auto', padding: 8 }}>
      <TimeLine
        fullSize
        currentRange={[moment().startOf('day'), moment()]}
        currentTime={'22:15'}
        events={events}
        onTimelineClick={action('onTimelineClick')}
        patchUserWork={action('patchUserWork') as any}
      />
    </div>
  ));
