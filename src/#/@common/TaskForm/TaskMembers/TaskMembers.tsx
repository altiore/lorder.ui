import React, { useMemo } from 'react';

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

  if (!members || !members.length) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <td colSpan={2}>
            <Typography variant="subtitle2">Участники</Typography>
          </td>
        </tr>
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
