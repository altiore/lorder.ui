import TableCell from '@material-ui/core/TableCell/TableCell';
import * as React from 'react';

export interface ITimerCellProps {
  currentTime: number;
}

export const TimerCellJsx: React.StatelessComponent<ITimerCellProps> = ({ currentTime }) => (
  <TableCell numeric>{currentTime}</TableCell>
);
