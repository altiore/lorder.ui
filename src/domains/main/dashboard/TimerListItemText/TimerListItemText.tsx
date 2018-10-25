import * as React from 'react';

import { covertSecondsToDuration } from 'src/store/@common/helpers';

export interface ITimerListItemTextProps {
  currentTime: number;
  duration: number;
  initial: number;
}

export const TimerListItemTextJsx: React.StatelessComponent<ITimerListItemTextProps> = ({
  currentTime,
  duration = 0,
  initial = 0,
}) => <span>{covertSecondsToDuration(currentTime + duration - initial)}</span>;
