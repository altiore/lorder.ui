import * as React from 'react';

import { Field, InjectedFormProps } from 'redux-form';
import { email, length, required } from 'redux-form-validators';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import { TextField } from '@components/TextField';

import { TextAreaMarkdown } from '#/@common/TaskForm/TextAreaMarkdown';

export interface IPostFeedbackData {
  email: string;
  name: string;
  feedback: string;
}

export interface IPostFeedbackProps extends InjectedFormProps<IPostFeedbackData, IPostFeedbackProps> {
  classes: any;
  onClose: any;
}

export const PostFeedbackTsx: React.FunctionComponent<IPostFeedbackProps> = ({ classes, onClose, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <DialogTitle className={classes.title} disableTypography>
      <Typography variant="h4">Оставить Отзыв</Typography>
      <IconButton onClick={onClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </DialogTitle>
    <DialogContent className={classes.content}>
      <Field
        className={classes.email}
        name="email"
        label="E-mail"
        placeholder="E-mail..."
        component={TextField}
        variant="outlined"
        margin="normal"
        validate={[
          required({ msg: 'Обязательное поле' }),
          email({ msg: 'Поле должно быть правильным E-mail адресом' }),
        ]}
      />
      <Field
        className={classes.email}
        name="name"
        label="Имя"
        placeholder="Как к вам обращаться?"
        component={TextField}
        variant="outlined"
        validate={[required({ msg: 'Обязательное поле' }), length({ min: 2, msg: 'Минимум 2 символа' })]}
      />
      <Field
        placeholder={`Опишите ваше впечатление о сервисе...\t\n Что вам понравилось? Что можно улучшить?`}
        name="feedback"
        component={TextAreaMarkdown}
      />
    </DialogContent>
    <DialogActions>
      <Button color="primary" variant="contained" type="submit">
        Отправить
      </Button>
    </DialogActions>
  </form>
);
