import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import * as Popover from 'react-popover';

import { LinkButton } from 'src/domains/@common/LinkButton';
import { ShortChart } from './ShortChart';

export interface IProjectButtonProps {
  classes?: any;
  id?: number;
  uuid?: string;
  time: string;
  title: string;
  percent: string;
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
    const { classes, uuid, id, time, title, percent } = this.props;
    return (
      <Popover
        place="below"
        isOpen={isOpen}
        onOuterAction={this.onClosePopover}
        body={<ShortChart id={id} title={title} time={time} percent={percent} />}
      >
        <LinkButton
          to={uuid ? `/p/${uuid}` : `/projects/${id}`}
          className={classes.button}
          onMouseEnter={this.onMouseEnterHandler}
          onMouseLeave={this.onClosePopover}
          // variant={'outlined'}
          color={'secondary'}
        >
          <Typography variant="body1" noWrap>
            {title}
          </Typography>
        </LinkButton>
      </Popover>
    );
  }

  private onClosePopover = () => this.setState({ isOpen: false });

  private onMouseEnterHandler = () => this.setState({ isOpen: true });
}
