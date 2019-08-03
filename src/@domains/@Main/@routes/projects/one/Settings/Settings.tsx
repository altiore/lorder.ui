import React, { useCallback } from 'react';

import Button from '@material-ui/core/Button';

export interface ISettingsProps {
  projectId?: number;
  publishProject: (p: number) => any;
  updateStatistic: (p: number) => any;
}

export const SettingsTsx: React.FunctionComponent<ISettingsProps> = ({
  projectId,
  publishProject,
  updateStatistic,
}) => {
  const handlePublishProject = useCallback(() => {
    if (typeof projectId === 'number') {
      publishProject(projectId);
    }
  }, [projectId, publishProject]);

  const handleUpdateStatistic = useCallback(() => {
    if (typeof projectId === 'number') {
      updateStatistic(projectId);
    }
  }, [projectId, updateStatistic]);

  return (
    <div style={{ display: 'flex', flexFlow: 'column nowrap', padding: 20 }}>
      <Button onClick={handlePublishProject}>Опубликовать проект</Button>
      <Button onClick={handleUpdateStatistic}>Обновить статистику проекта</Button>
    </div>
  );
};
