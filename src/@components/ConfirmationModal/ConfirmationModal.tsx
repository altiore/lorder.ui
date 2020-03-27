import React, { Fragment, useCallback } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { useStyles } from './styles';

export const ACTION_TYPES = { ERROR: 'error', INFO: 'info' };

export interface IConfirmationModalProps {
  onClose?: any;
  onConfirm: any;
  confirmText: string;
  action?: any;
  titleText?: string;
  cancelText?: string;
}

export const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  onClose,
  onConfirm,
  confirmText,
  action,
  titleText,
  cancelText,
}) => {
  const classes = useStyles();

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

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
            {titleText}
          </Typography>
          <Typography align="center" className={classes.textSure}>
            Подтвердите действие
          </Typography>
        </div>
        <div className={classes.buttons}>
          {action === ACTION_TYPES.INFO ? (
            <Button variant="outlined" onClick={handleConfirm}>
              {confirmText}
            </Button>
          ) : (
            <Button variant="outlined" className={classes.errorButton} onClick={handleConfirm}>
              {confirmText}
            </Button>
          )}
          <Button variant="outlined" onClick={onClose}>
            {cancelText}
          </Button>
        </div>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Typography className={classes.warningText}>Это действие не может быть отменено!</Typography>
      </DialogActions>
    </Fragment>
  );
};
