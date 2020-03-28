import React from 'react';

import { SvgIconProps } from '@material-ui/core/SvgIcon';
import BugReportIcon from '@material-ui/icons/BugReport';
import ExtensionIcon from '@material-ui/icons/Extension';

export interface ITaskTypeProps extends SvgIconProps {
  typeId?: string | number;
}

const icons: any = {
  bug: BugReportIcon,
  feature: ExtensionIcon,
};

const colors: any = {
  bug: {
    color: 'red',
  },
  feature: {
    color: '#4BC800',
  },
};

const TaskTypeIcon: React.FunctionComponent<ITaskTypeProps> = ({ typeId, ...rest }) => {
  const IconComponent = (typeId && icons[typeId]) || ExtensionIcon;
  const style = (typeId && colors[typeId]) || colors.feature;
  return <IconComponent style={style} {...rest} />;
};

export default TaskTypeIcon;
