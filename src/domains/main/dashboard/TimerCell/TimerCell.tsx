import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import * as React from 'react';

export interface ITimerCellProps {
  currentTimeHumanize: string;
}

export const TimerCellJsx: React.StatelessComponent<ITimerCellProps> = ({ currentTimeHumanize }) => (
  <TableCell numeric>
    <Button disableFocusRipple disableRipple style={{ cursor: 'not-allowed' }}>
      {currentTimeHumanize}
    </Button>
  </TableCell>
);
