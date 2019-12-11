import MenuItem from '@material-ui/core/MenuItem';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import cn from 'classnames';
import React from 'react';

import { ITask } from '@types';
import TaskTypeIcon from '@components/@icons/TaskTypeIcon';
import { Project } from '@store/projects';

const match = require('autosuggest-highlight/match');
const parse = require('autosuggest-highlight/parse');

export interface ISuggestionProps {
  classes: any;
  project: Project;
  selected: boolean;
  task: ITask;
  query: any;
}

export const SuggestionTsx: React.FC<ISuggestionProps> = ({ classes, project, task, selected, query }) => {
  const matches = match(task.title, query);
  const parts = parse(task.title, matches);

  return (
    <MenuItem selected={selected} component="div" className={classes.root} classes={{ selected: classes.rootSelected }}>
      <div className={cn(classes.project, { [classes.projectSelected]: selected })}>{project.title}</div>
      <div className={classes.task}>
        <TaskTypeIcon typeId={task.typeId} className={classes.taskIcon} />
        <span className={classes.taskText}>
          {parts.map((part: any, index: any) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            )
          )}
        </span>
        {task.id === 0 && <span className={classes.new}>New</span>}
      </div>
      <div className={classes.runButton}>
        <PlayArrowRounded fontSize="small" className={classes.runButtonIcon} />
      </div>
    </MenuItem>
  );
};
