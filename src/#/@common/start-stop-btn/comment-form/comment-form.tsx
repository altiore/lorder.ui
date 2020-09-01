import React, { Fragment, useCallback, useState } from 'react';

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from './styles';

import { ITask } from '@types';

export interface IProps {
  bringBack: any;
  onClose?: any;
  task: ITask;
}

export const CommentForm: React.FC<IProps> = ({ bringBack, onClose, task }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleInput = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setReason(value);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!reason || reason.length < 7) {
      setError('Минимум 7 символов');
      return;
    }
    if (task && reason) {
      try {
        await bringBack(task, reason);
        onClose();
        return;
      } catch (e) {
        // no content
      }
    }
    setError('Что-то пошло не так');
  }, [bringBack, onClose, reason, task]);

  const { buttons, dialogContent, dialogTitle, textBlock, textTitle } = useStyles();
  return (
    <Fragment>
      <DialogTitle disableTypography className={dialogTitle}>
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </DialogTitle>
      <DialogContent className={dialogContent}>
        <div className={textBlock}>
          <Typography variant="h4" align="center" className={textTitle}>
            Объясните, что необходимо добавить в задачу, чтоб ее можно было выполнить
          </Typography>
          <TextField
            error={Boolean(error)}
            helperText={error}
            label="Оставьте комментарий"
            multiline
            rows={4}
            variant="filled"
            fullWidth
            onChange={handleInput}
            value={reason}
          />
        </div>
        <div className={buttons}>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Вернуть на доработку
          </Button>
        </div>
      </DialogContent>
    </Fragment>
  );
};
