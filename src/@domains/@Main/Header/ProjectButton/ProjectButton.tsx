import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import React from 'react';
import Popover from 'react-popover';

import { ShortChart } from '@domains/@common/ShortChart';
export interface IProjectButtonProps {
  classes?: any;
  id?: number;
  inProgress: boolean;
  uuid?: string;
  time: string;
  title?: string;
  percent?: number | string;
  onOpenInNew: any;
  selectProject: any;
}

export interface IProjectButtonState {
  isOpen: boolean;
}

export class ProjectButtonTsx extends React.Component<IProjectButtonProps, IProjectButtonState> {
  state = {
    isOpen: false,
  };

  render() {
    const { isOpen } = this.state;
    const { classes, inProgress, onOpenInNew, selectProject, time, title, percent } = this.props;
    return (
      <Popover
        className={classes.projectPopover}
        tipSize={4}
        place="below"
        isOpen={isOpen}
        onOuterAction={this.onClosePopover}
        body={<ShortChart project={{ time, title, percent }} />}
      >
        <Button
          className={classes.button}
          component="div"
          onClick={selectProject}
          onMouseEnter={this.onMouseEnterHandler}
          onMouseLeave={this.onClosePopover}
          onMouseOver={this.onMouseEnterHandler}
          variant={'outlined'}
          color={'secondary'}
        >
          <Typography variant="body1" noWrap className={classes.text}>
            {title}
          </Typography>
          <IconButton
            color="secondary"
            onClick={onOpenInNew}
            className={classes.openInNew}
            style={{ visibility: isOpen ? 'visible' : 'hidden' }}
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
          {inProgress && <span className={classes.inProgress} />}
        </Button>
      </Popover>
    );
  }

  private onClosePopover = () => this.setState({ isOpen: false });

  private onMouseEnterHandler = () => this.setState({ isOpen: true });
}
