import React from 'react';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';

export interface ITimerCellProps {
  currentTimeHumanize: string;
}

export const TimerCellJsx: React.FunctionComponent<ITimerCellProps> = ({ currentTimeHumanize }) => (
  <TableCell align="right">
    <Button disableFocusRipple disableRipple style={{ cursor: 'not-allowed' }}>
      {currentTimeHumanize}
    </Button>
  </TableCell>
);
