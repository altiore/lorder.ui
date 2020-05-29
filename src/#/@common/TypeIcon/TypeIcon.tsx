import React, { useMemo } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import ExtensionIcon from '@material-ui/icons/Extension';
// import BugReportIcon from '@material-ui/icons/BugReport';
import EnhanceIcon from '@material-ui/icons/LabelImportantRounded';

import BugIcon from '@components/@icons/Bug';
import DocIcon from '@components/@icons/Doc';
import MeetingIcon from '@components/@icons/Meeting';

import { ITaskType, TASK_TYPE } from '@types';

export interface ITaskCard extends SvgIconProps {
  getTaskTypeById: (id: number) => ITaskType;
  typeId: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  [TASK_TYPE.BUG]: {
    color: '#FF6969',
  },
  [TASK_TYPE.FEATURE]: {
    color: '#81D755',
  },
  [TASK_TYPE.DOCUMENTATION]: {
    color: '#35C5E0',
  },
  [TASK_TYPE.ENHANCE]: {
    color: theme.palette.secondary.dark,
  },
  [TASK_TYPE.ORGANIZE]: {
    color: '#EECF6D',
  },
}));

const TYPE_COMPONENT = {
  [TASK_TYPE.BUG]: BugIcon,
  // [TASK_TYPE.BUG]: BugReportIcon,
  [TASK_TYPE.FEATURE]: ExtensionIcon,
  [TASK_TYPE.DOCUMENTATION]: DocIcon,
  [TASK_TYPE.ENHANCE]: EnhanceIcon,
  [TASK_TYPE.ORGANIZE]: MeetingIcon,
};

export const TypeIconTsx: React.FC<ITaskCard> = ({ className, fontSize, getTaskTypeById, typeId }) => {
  const classes = useStyles();
  const taskTypeName = useMemo(() => {
    const taskType = getTaskTypeById(typeId);
    if (taskType) {
      return taskType.name;
    }

    return TASK_TYPE.FEATURE;
  }, [getTaskTypeById, typeId]);

  const CurrentIcon = useMemo(() => {
    const component = TYPE_COMPONENT[taskTypeName];
    return component || ExtensionIcon;
  }, [taskTypeName]);

  return <CurrentIcon fontSize={fontSize} className={`${className} ${classes[taskTypeName]}`} />;
};
