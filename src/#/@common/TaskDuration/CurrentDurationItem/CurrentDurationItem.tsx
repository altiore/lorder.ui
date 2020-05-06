import React from 'react';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export interface ICurrentDurationItemProps {
  time: string;
  isOpen: boolean;
  onClick: any;
}

export const CurrentDurationItemTsx: React.FunctionComponent<ICurrentDurationItemProps> = ({
  time = 0,
  isOpen = false,
  onClick,
}) => {
  return (
    <Tooltip placement={'right'} title={isOpen ? 'Закрыть подробности' : 'Нажмите, чтоб раскрыть подробности'}>
      <Button onClick={onClick}>{time}</Button>
    </Tooltip>
  );
};
