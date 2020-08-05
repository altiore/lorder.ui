import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import ProjectSelect from '.';
import CenterDecorator from '../../../.storybook/decor/Center';
import { IProject, PROJECT_TYPE } from '../../@types';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: 500,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 200,
    padding: theme.spacing(2),
  },
}));

const projects: IProject[] = [
  {
    id: 1,
    shortName: 'AL',
    title: 'Lorder',
    type: PROJECT_TYPE.SOCIALLY_USEFUL,
  },
  {
    id: 2,
    shortName: 'BE',
    title: 'Benefy',
    type: PROJECT_TYPE.SOCIALLY_USEFUL,
  },
  {
    id: 3,
    shortName: 'СТ',
    title: 'Страна',
    type: PROJECT_TYPE.SOCIALLY_USEFUL,
  },
  {
    id: 31,
    shortName: 'ОБ',
    title: 'Образование',
    type: PROJECT_TYPE.SOCIALLY_USEFUL,
  },
  {
    id: 32,
    shortName: 'МЕ',
    title: 'Медицина',
    type: PROJECT_TYPE.SOCIALLY_USEFUL,
  },
  {
    id: 33,
    shortName: 'НА',
    title: 'Наука',
    type: PROJECT_TYPE.SOCIALLY_USEFUL,
  },
  {
    id: 4,
    shortName: 'СП',
    title: 'Спорт',
    type: PROJECT_TYPE.PERSONALLY_USEFUL,
  },
  {
    id: 98,
    shortName: 'ПН',
    title: 'Прогулки на воздухе',
    type: PROJECT_TYPE.PERSONALLY_USEFUL,
  },
] as IProject[];

const projectId = 1;

storiesOf('ProjectSelect', module)
  .addDecorator(CenterDecorator)
  .add('default', () => {
    const { form, root } = useStyles();
    return (
      <div className={root}>
        <div className={form}>
          <ProjectSelect onChange={action('onChange')} projects={projects} projectId={projectId} />
          <ProjectSelect onChange={action('onChange')} projects={projects} />
        </div>
      </div>
    );
  });
