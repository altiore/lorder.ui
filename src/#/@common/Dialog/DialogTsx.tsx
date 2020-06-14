import React, { useCallback } from 'react';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';

import { CurrentDialog, DEFAULT_TRANSITION_DURATION } from '#/@store/dialog';

export interface IDialogTsx {
  closeDialog: () => void;
  dialogProps: Partial<DialogProps>;
  internalProps: object;
  isWidthSm: boolean;
  open: boolean;
}

export const DialogTsx: React.FunctionComponent<IDialogTsx> = ({
  closeDialog,
  dialogProps,
  internalProps,
  isWidthSm,
  open,
}) => {
  const { onClose } = dialogProps || {};
  const handleClose = useCallback(
    (event, reason) => {
      closeDialog();
      if (typeof onClose === 'function') {
        onClose(event, reason);
      }
    },
    [closeDialog, onClose]
  );

  if (!CurrentDialog) {
    return null;
  }

  return (
    <Dialog
      open={Boolean(open)}
      fullScreen={isWidthSm}
      scroll="paper"
      transitionDuration={DEFAULT_TRANSITION_DURATION}
      {...dialogProps}
      onClose={handleClose}
    >
      {React.isValidElement(CurrentDialog)
        ? React.cloneElement<any>(CurrentDialog, {
            ...(internalProps || {}),
            key: 'dialog-content',
            onClose: handleClose,
          })
        : React.createElement(CurrentDialog as any, {
            ...(internalProps || {}),
            key: 'dialog-content',
            onClose: handleClose,
          })}
    </Dialog>
  );
};
