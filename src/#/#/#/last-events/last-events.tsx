import React, { useCallback, useState } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';

import Statistics from '@components/@icons/Statistics';
import TimeIcon from '@components/@icons/Time';

import Today from './today';

import { IEvent } from '@types';

const BLOCK_MAX_HEIGHT = 462;

export const useStyles = makeStyles((theme: Theme) => ({
  details: {
    ...theme.mainContent.scroll,
    maxHeight: BLOCK_MAX_HEIGHT,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: 0,
  },
  expanded: {
    ...theme.mainContent.scroll,
    maxHeight: BLOCK_MAX_HEIGHT,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: 0,
  },
  heading: {
    color: theme.palette.pause.dark,
    flexBasis: '100%',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 400,
    lineHeight: 1.7,
  },
  icon: {
    color: theme.palette.primary.light,
  },
  list: {
    width: '100%',
  },
  root: {
    width: '100%',
  },
  summaryIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}));

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
    setExpanded(prev => ({ ...prev, statistic: !prev.statistic }));
  }, [setExpanded]);

  const toggleLastEvents = useCallback(() => {
    setExpanded(prev => ({ ...prev, lastEvents: !prev.lastEvents }));
  }, [setExpanded]);

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded.statistic} onChange={toggleStatistic}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.icon} />}>
          <Statistics className={classes.summaryIcon} />
          <Typography className={classes.heading}>Статистика</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.expanded }}>
          <Today />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded.lastEvents} onChange={toggleLastEvents}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.icon} />}>
          <TimeIcon className={classes.summaryIcon} />
          <Typography className={classes.heading}>Последние действия</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.details }}>
          <List dense classes={{ root: classes.list }}>
            {events.map(event => (
              <ListItem key={event.userWork.id} button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  secondary={`${event.name}`}
                  primary={`${event.userWork.startAt.fromNow()} (${event.userWork.startAt.format('HH:mm')})`}
                />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
