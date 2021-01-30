import React, { useCallback, useState } from 'react';

import cn from 'classnames';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Collapse from '@material-ui/core/Collapse';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ProjectIco } from '@components/@icons/Project';
import InputField from '@components/input-field';
import RadioButtonField from '@components/radio-button-field';
import { SelectField } from '@components/select-field';
import { TextField } from '@components/text-field';

import { PROJECT_STRATEGY, PROJECT_TYPE } from '@types';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: '#F4F5F7',
    paddingBottom: theme.spacing(2),
  },
  details: {
    '& > *': {
      margin: theme.spacing(1, 0),
    },
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    paddingTop: theme.spacing(1),
  },
  expandBtn: {
    '& > svg': {
      transition: theme.transitions.create(['transform']),
    },
    alignItems: 'center',
    borderRadius: 4,
    display: 'flex',
    height: 44,
    justifyContent: 'space-between',
    padding: '0 8px 0 2px',
    width: '100%',
  },
  expandBtnOpen: {
    '& > svg': {
      transform: 'rotate(180deg)',
    },
  },
  panel: {
    width: '100%',
  },
  titleStyle: {
    paddingLeft: 11,
  },
}));

interface IProjectFormProps extends InjectedFormProps<{}, IProjectFormProps> {
  goToPage: any;
  onClose: any;
  title?: string;
  type?: string;
  buttonText?: string;
}

const typeVariants = [
  {
    title: 'Социальный',
    value: PROJECT_TYPE.SOCIALLY_USEFUL,
  },
  {
    title: 'Личный',
    value: PROJECT_TYPE.PERSONALLY_USEFUL,
  },
];

export const CreateProjectPopupJsx: React.FunctionComponent<IProjectFormProps> = ({ handleSubmit, onClose }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = useCallback(() => {
    setExpanded(o => !o);
  }, []);

  const { content, details, expandBtn, expandBtnOpen, panel, titleStyle } = useStyles();

  return (
    <>
      <DialogTitle disableTypography>
        <Typography className={titleStyle}>Создать Проект</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent className={content}>
        <form onSubmit={handleSubmit}>
          <Field
            autoFocus
            name="title"
            component={TextField}
            margin="normal"
            icon={<ProjectIco />}
            label="Название проекта"
            validate={[required({ msg: 'Обязательное поле' })]}
          />
          <Field name="type" component={RadioButtonField} label="Тип проекта:" items={typeVariants} />
          <div className={panel}>
            <ButtonBase className={cn(expandBtn, { [expandBtnOpen]: expanded })} onClick={toggleExpanded}>
              <span>Расширенные настройки</span>
              <ExpandMoreIcon />
            </ButtonBase>
            <Collapse in={expanded}>
              <div className={details}>
                <Field name="desc" component={InputField} label="Описание" fullWidth />
                <Field name="slogan" component={InputField} label="Призыв присоединиться" fullWidth />
                <Field name="monthlyBudget" component={InputField} label="Месячный бюджет" type={'number'} fullWidth />
                <Field
                  name="strategy"
                  // TODO: удалить, когда функционал будет готов
                  disabled
                  component={SelectField}
                  items={PROJECT_STRATEGY}
                  label="Стратегия перемещения задач"
                />
              </div>
            </Collapse>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={onClose}>
          Отмена
        </Button>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Создать проект
        </Button>
      </DialogActions>
    </>
  );
};
