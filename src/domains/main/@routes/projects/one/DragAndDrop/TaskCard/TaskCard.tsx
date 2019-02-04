import Avatar from '@material-ui/core/Avatar';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import BugReportIcon from '@material-ui/icons/BugReport';
import ExtensionIcon from '@material-ui/icons/Extension';
import * as React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import { ProjectTask } from 'src/store/projects';

export interface ITaskCard extends Partial<ProjectTask> {
  classes: any;
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

export const TaskCardTsx: React.FunctionComponent<ITaskCard> = ({
  classes,
  onClick,
  title,
  typeId,
  value,
  provided,
  snapshot,
}) => {
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
        {typeId ? (
          <BugReportIcon fontSize="small" className={classes.iconBug} />
        ) : (
          <ExtensionIcon fontSize="small" className={classes.iconStory} />
        )}
        <Typography gutterBottom component="span">
          {title}
        </Typography>
      </span>
      <div className={classes.footer}>
        <div className={classes.row}>
          <div className={classes.value}>
            <Typography component="span" variant="caption" className={classes.valueText}>
              {value || '-'}
            </Typography>
          </div>
        </div>
        <Avatar className={classes.avatar}>CK</Avatar>
      </div>
    </div>
  );
};
