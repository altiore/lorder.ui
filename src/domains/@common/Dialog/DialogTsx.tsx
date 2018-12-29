import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { Theme } from '@material-ui/core/styles';
import * as React from 'react';

import { CurrentDialog } from 'src/store/dialog/actions';

export interface IDialogTsx {
  theme: Theme;
  width?: number;
}

export const DialogTsx: React.FunctionComponent<DialogProps & IDialogTsx> = props => {
  if (!CurrentDialog) {
    return null;
  }
  const { theme, width } = props;
  return (
    <Dialog fullScreen={(width || 0) <= theme.breakpoints.values.sm} {...props} aria-labelledby="scroll-dialog-title">
      {React.isValidElement(CurrentDialog)
        ? React.cloneElement<any>(CurrentDialog, { onClose: props.onClose })
        : React.createElement(CurrentDialog as any, { onClose: props.onClose })}
    </Dialog>
  );
};
