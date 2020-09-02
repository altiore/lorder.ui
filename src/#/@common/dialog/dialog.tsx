import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import { DEFAULT_TRANSITION_DURATION, dialogComponents, IDialog } from '#/@store/dialog';

export interface IDialogTsx {
  closeDialog: () => void;
  dialogsData: IDialog[];
  isWidthSm: boolean;
  lastProps: any;
}

export const DialogTsx: React.FunctionComponent<IDialogTsx> = ({
  closeDialog,
  dialogsData,
  isWidthSm,
  lastProps,
}): JSX.Element | null => {
  if (!dialogComponents.length) {
    return null;
  }

  return (
    <>
      {dialogComponents.map((CurrentDialog, i) => {
        const { dialogProps, isOpened, props } = dialogsData[i] || { isOpened: false, dialogProps: lastProps };
        const handleClose = (event, reason) => {
          closeDialog();
          if (typeof dialogProps?.onClose === 'function') {
            dialogProps.onClose(event, reason);
          }
        };
        return (
          <Dialog
            key={i}
            open={Boolean(isOpened)}
            fullScreen={isWidthSm}
            scroll="paper"
            transitionDuration={DEFAULT_TRANSITION_DURATION}
            {...dialogProps}
            onClose={handleClose}
          >
            {React.isValidElement(CurrentDialog)
              ? React.cloneElement<any>(CurrentDialog, {
                  ...(props || {}),
                  key: 'dialog-content' + i,
                  onClose: handleClose,
                })
              : React.createElement(CurrentDialog as any, {
                  ...(props || {}),
                  key: 'dialog-content' + i,
                  onClose: handleClose,
                })}
          </Dialog>
        );
      })}
    </>
  );
};
