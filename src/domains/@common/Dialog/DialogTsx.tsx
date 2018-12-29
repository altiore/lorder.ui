import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import * as React from 'react';

import { CurrentDialog } from 'src/store/dialog/actions';

export const DialogTsx: React.FunctionComponent<DialogProps> = props => {
  if (!CurrentDialog) {
    return null;
  }
  return (
    <Dialog {...props} aria-labelledby="scroll-dialog-title">
      {React.isValidElement(CurrentDialog)
        ? React.cloneElement<any>(CurrentDialog, { onClose: props.onClose })
        : React.createElement(CurrentDialog as any, { onClose: props.onClose })}
    </Dialog>
  );
};
