import React, { useMemo } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import get from 'lodash/get';

import Badge from '@material-ui/core/Badge';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';

import Avatar from '@components/avatar';
import TooltipBig from '@components/tooltip-big';
import ValueField from '@components/value';

import TypeIcon from '#/@common/type-icon';

import { ITask, IUser } from '@types';

export interface ITaskCard extends ITask {
  classes: any;
  getProjectMemberById: (_: any) => IUser;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  onClick: any;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // change background colour if dragging
  background: isDragging ? grey[50] : '#ffffff',

  // styles we need to apply on draggables
  ...draggableStyle,
  cursor: 'pointer',
});

export const TaskCardTsx: React.FC<ITaskCard> = ({
  classes,
  commentsCount,
  getProjectMemberById,
  inProgress,
  onClick,
  title,
  typeId,
  value,
  performerId,
  provided,
  snapshot,
}) => {
  const taskPerformer = useMemo<IUser>(() => {
    return getProjectMemberById(performerId);
  }, [getProjectMemberById, performerId]);

  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      onClick={onClick}
      className={classes.root}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <span className={classes.row}>
        <TypeIcon typeId={typeId} fontSize="small" />
        <Typography gutterBottom component="span">
          {title}
        </Typography>
        {inProgress && (
          <TooltipBig title="В процессе" placement="top">
            <div className={classes.progressIndicator}>
              <span />
            </div>
          </TooltipBig>
        )}
      </span>
      <div className={classes.footer}>
        <div className={classes.row}>
          <ValueField>{value}</ValueField>
        </div>
        <div className={classes.rowRight}>
          {Boolean(commentsCount) && (
            <Badge color="primary" badgeContent={commentsCount}>
              <MailIcon />
            </Badge>
          )}
          <TooltipBig title={get(taskPerformer, 'userName', 'N/A')} placement="bottom">
            <Avatar size="sm" src={get(taskPerformer, ['avatar', 'url'])}>
              {get(taskPerformer, ['email'], '--')}
            </Avatar>
          </TooltipBig>
        </div>
      </div>
    </div>
  );
};
