import React, { useCallback, useState } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';

import { useStyles } from './styles';
import Today from './Today';

import { IEvent } from '@types';

export interface ILastEventsProps {
  events: IEvent[];
}

export interface IExpanded {
  statistic: boolean;
  lastEvents: boolean;
}

export const LastEventsTsx: React.FC<ILastEventsProps> = ({ events }): JSX.Element => {
  const [expanded, setExpanded] = useState<IExpanded>({ statistic: true, lastEvents: false });

  const classes = useStyles();

  const toggleStatistic = useCallback(() => {
    setExpanded({ ...expanded, statistic: !expanded.statistic });
  }, [expanded]);

  const toggleLastEvents = useCallback(() => {
    setExpanded({ ...expanded, lastEvents: !expanded.lastEvents });
  }, [expanded]);

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded.statistic} onChange={toggleStatistic}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Статистика</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.expanded }}>
          <Today />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded.lastEvents} onChange={toggleLastEvents}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Последние действия</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.details }}>
          <List dense classes={{ root: classes.list }}>
            {events.map(event => (
              <ListItem key={event.data.id} button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  secondary={`${event.name}`}
                  primary={`${event.startAt.fromNow()} (${event.startAt.format('HH:mm')})`}
                />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
