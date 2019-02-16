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
import * as React from 'react';

import { IEvent } from 'src/@types';
import { Statistic } from './Statistic';

export interface ILastEventsProps {
  events: IEvent[];
  classes?: any;
}

export class LastEventsTsx extends React.Component<ILastEventsProps, {}> {
  state = {
    expanded: 'statistic',
  };

  handleChange = (panel: string) => (event: React.SyntheticEvent, expanded: boolean) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes, events } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'statistic'} onChange={this.handleChange('statistic')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Статистика</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: classes.expanded }}>
            <Statistic dense />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'lastEvents'} onChange={this.handleChange('lastEvents')}>
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
  }
}
