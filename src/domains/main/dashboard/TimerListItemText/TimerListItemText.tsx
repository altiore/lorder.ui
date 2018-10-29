import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import * as React from 'react';

import { covertSecondsToDuration } from 'src/store/@common/helpers';

export interface ITimerListItemTextProps {
  currentTime: number;
  duration: number;
  initial: number;
  isOpen: boolean;
  onClick: any;
}

export const TimerListItemTextJsx: React.StatelessComponent<ITimerListItemTextProps> = ({
  currentTime,
  duration = 0,
  initial = 0,
  isOpen = false,
  onClick,
}) => (
  <Tooltip placement={'right'} title={isOpen ? 'Закрыть подробности' : 'Нажмите, чтоб раскрыть подробности'}>
    <Button onClick={onClick}>{covertSecondsToDuration(currentTime + duration - initial)}</Button>
  </Tooltip>
);
