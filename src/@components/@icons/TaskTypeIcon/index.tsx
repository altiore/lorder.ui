import React from 'react';

import { SvgIconProps } from '@material-ui/core/SvgIcon';
import BugReportIcon from '@material-ui/icons/BugReport';
import ExtensionIcon from '@material-ui/icons/Extension';

export interface ITaskTypeProps extends SvgIconProps {
  typeId?: string | number;
}

const icons: { [key: string]: (props: SvgIconProps) => JSX.Element } = {
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
  const IconComponent: (props: SvgIconProps) => JSX.Element = (typeId && icons[typeId]) || icons.feature;
  const style = (typeId && colors[typeId]) || colors.feature;
  return <IconComponent style={style} {...rest} />;
};

export default TaskTypeIcon;
