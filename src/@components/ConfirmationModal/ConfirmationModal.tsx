import React, { Fragment, useCallback, useState } from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from './styles';

export enum ACTION_TYPE {
  ERROR = 'error',
  INFO = 'info',
}

export interface IConfirmationModalProps {
  action?: ACTION_TYPE;
  cancelText?: string;
  confirmText: string;
  onCancel?: any;
  onClose?: any;
  onConfirm: any;
  text?: string;
  titleText?: string;
  warningText?: string;
}

export const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  action,
  cancelText = 'Отмена',
  confirmText,
  onCancel,
  onClose,
  onConfirm,
  text = 'Подтвердите действие',
  titleText,
  warningText = 'Это действие не может быть отменено!',
}) => {
  const classes = useStyles();
  const [internalState] = useState<any>({
    _action: action,
    _cancelText: cancelText,
    _confirmText: confirmText,
    _text: text,
    _titleText: titleText,
    _warningText: warningText,
  });

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  }, [onCancel, onClose]);

  const { _action, _cancelText, _confirmText, _text, _titleText, _warningText } = internalState;
  return (
    <Fragment>
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <IconButton className={classes.closeIcon} onClick={onClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.textBlock}>
          <Typography variant="h4" align="center" className={classes.textTitle}>
            {_titleText}
          </Typography>
          <Typography align="center" className={classes.textSure}>
            {_text}
          </Typography>
        </div>
        <div className={classes.buttons}>
          <Button
            variant="outlined"
            className={_action === ACTION_TYPE.INFO ? '' : classes.errorButton}
            onClick={handleConfirm}
          >
            {_confirmText}
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            {_cancelText}
          </Button>
        </div>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Typography className={classes.warningText}>{_warningText}</Typography>
      </DialogActions>
    </Fragment>
  );
};
