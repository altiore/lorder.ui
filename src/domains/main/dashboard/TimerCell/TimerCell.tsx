import TableCell from '@material-ui/core/TableCell/TableCell';
import * as React from 'react';

export interface ITimerCellProps {
  currentTimeHumanize: string;
}

export const TimerCellJsx: React.StatelessComponent<ITimerCellProps> = ({ currentTimeHumanize }) => (
  <TableCell numeric>{currentTimeHumanize}</TableCell>
);
