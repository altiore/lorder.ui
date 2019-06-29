import Button from '@material-ui/core/Button';
import React from 'react';

export interface ISettingsProps {
  publishProject?: any;
  updateStatistic?: any;
}

export const SettingsTsx: React.FunctionComponent<ISettingsProps> = ({ publishProject, updateStatistic }) => (
  <div style={{ display: 'flex', flexFlow: 'column nowrap', padding: 20 }}>
    <Button onClick={publishProject}>Опубликовать проект</Button>
    <Button onClick={updateStatistic}>Обновить статистику проекта</Button>
  </div>
);
