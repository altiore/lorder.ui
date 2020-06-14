import React, { useEffect, useMemo, useState } from 'react';

import { WrappedFieldProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { STATUS_NAMES } from '#/@store/tasks';

import { ITaskStatus } from '@types';

interface IStatusField extends WrappedFieldProps {
  getTaskColumnsByProjectId: (id: number) => ITaskStatus[];
  projectId: number;
}

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: theme.spacing(16),
    paddingRight: 26,
  },
}));

export const StatusField: React.FC<IStatusField> = ({ input, getTaskColumnsByProjectId, projectId }) => {
  const statusColumns = useMemo<ITaskStatus[]>(() => {
    if (getTaskColumnsByProjectId && projectId) {
      return getTaskColumnsByProjectId(projectId);
    }
    return [];
  }, [getTaskColumnsByProjectId, projectId]);

  const [statusToName, setStatusToName] = useState<{ [key in number]: string }>({});

  useEffect(() => {
    if (statusColumns && statusColumns.length) {
      setStatusToName(
        statusColumns.reduce((res, el) => {
          res[el.id] = el.name;
          return res;
        }, {})
      );
    }
  }, [statusColumns]);

  const { button } = useStyles();
  return (
    <Button className={button} variant="outlined" aria-label="status button">
      {STATUS_NAMES[statusToName[input.value]] || input.value}
    </Button>
  );
};
