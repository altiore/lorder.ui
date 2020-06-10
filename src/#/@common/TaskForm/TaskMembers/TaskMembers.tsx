import React, { useMemo } from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IUserTask } from '@types';

export interface ITaskMembers {
  getTaskUsersByTaskId: (id: number) => IUserTask[];
  taskId?: number;
}

export const TaskMembersTsx: React.FC<ITaskMembers> = ({ getTaskUsersByTaskId, taskId }) => {
  const members = useMemo(() => {
    if (taskId) {
      return getTaskUsersByTaskId(taskId) || [];
    }

    return [];
  }, [getTaskUsersByTaskId, taskId]);

  return (
    <table>
      <thead>
        <Typography variant="subtitle2">Участники</Typography>
      </thead>
      <tbody>
        {members.map(({ benefitPart, user, userId }) => (
          <tr key={userId}>
            <td>{user.displayName}</td>
            <td>
              {new Intl.NumberFormat('ru-RU', {
                style: 'percent',
              }).format(benefitPart)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
