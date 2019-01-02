import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

export interface IConfirmDialogProps {
  onClose?: any;
  onSubmit: any;
}

const onLocalSubmit = (onClose: any, onSubmit: any) => () => onClose() && onSubmit();

export const ConfirmDialogTsx: React.FunctionComponent<IConfirmDialogProps> = ({ onClose, onSubmit }) => (
  <React.Fragment>
    <DialogContent>
      <Typography variant="subtitle1">Сохранить измененные события и диапазоны?</Typography>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onClose}>
        Отменить
      </Button>
      <Button color="primary" variant="contained" onClick={onLocalSubmit(onClose, onSubmit)}>
        Подтвердить
      </Button>
    </DialogActions>
  </React.Fragment>
);
