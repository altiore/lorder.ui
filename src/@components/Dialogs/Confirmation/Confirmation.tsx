import React from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export class IConfirmationProps {
  onClose?: any;
  onConfirm: any;
  text?: string;
  title?: string;
}

export const Confirmation: React.FunctionComponent<IConfirmationProps> = ({ onClose, text, title, onConfirm }) => (
  <>
    <DialogTitle>{title || 'Внимание!'}</DialogTitle>
    <DialogContent>
      <Typography>{text || 'Вы уверены что хотите совершить это действие?'}</Typography>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onClose}>
        Отмена
      </Button>
      <Button color="primary" variant="contained" onClick={onConfirm}>
        Подтвердить
      </Button>
    </DialogActions>
  </>
);
