import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import * as Popover from 'react-popover';

import { LinkButton } from 'src/domains/@common/LinkButton';
import { ShortChart } from 'src/domains/@common/ShortChart';

export interface IProjectButtonProps {
  classes?: any;
  id?: number;
  inProgress: boolean;
  uuid?: string;
  time: string;
  title?: string;
  percent?: number | string;
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
    const { classes, uuid, id, inProgress, time, title, percent } = this.props;
    return (
      <Popover
        className={classes.projectPopover}
        tipSize={4}
        place="below"
        isOpen={isOpen}
        onOuterAction={this.onClosePopover}
        body={<ShortChart project={{ time, title, percent }} />}
      >
        <LinkButton
          to={uuid ? `/p/${uuid}` : `/projects/${id}`}
          className={classes.button}
          onMouseEnter={this.onMouseEnterHandler}
          onMouseLeave={this.onClosePopover}
          variant={'outlined'}
          color={'secondary'}
        >
          {inProgress && <span className={classes.inProgress} />}
          <Typography variant="body1" noWrap className={classes.text}>
            {title}
          </Typography>
        </LinkButton>
      </Popover>
    );
  }

  private onClosePopover = () => this.setState({ isOpen: false });

  private onMouseEnterHandler = () => this.setState({ isOpen: true });
}
