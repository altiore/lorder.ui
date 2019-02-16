import MenuItem from '@material-ui/core/MenuItem';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import * as React from 'react';
const match = require('autosuggest-highlight/match');
const parse = require('autosuggest-highlight/parse');

import { ITask } from 'src/@types';
import TaskTypeIcon from 'src/components/@icons/TaskTypeIcon';

export interface ISuggestionProps {
  classes: any;
  project: any;
  selected: boolean;
  task: ITask;
  query: any;
}

export const SuggestionTsx: React.FunctionComponent<ISuggestionProps> = ({
  classes,
  project,
  task,
  selected,
  query,
}) => {
  const matches = match(task.title, query);
  const parts = parse(task.title, matches);

  return (
    <MenuItem selected={selected} component="div" className={classes.root}>
      <div className={classes.project} style={{ opacity: selected ? 1 : 0.2 }}>
        {project.title}
      </div>
      <div className={classes.task}>
        <TaskTypeIcon typeId={task.typeId} className={classes.taskIcon} />
        <span className={classes.taskText}>
          {parts.map(
            (part: any, index: any) =>
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
      </div>
      <div className={classes.runButton}>
        <PlayArrowRounded fontSize="small" className={classes.runButtonIcon} />
      </div>
    </MenuItem>
  );
};
