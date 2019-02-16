import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import get from 'lodash-es/get';
import * as moment from 'moment';
import * as React from 'react';

import { IEvent } from 'src/@types';

export interface IDailyRoutineProps {
  classes: any;
  getRef: any;
  events: IEvent[];
  onChange: (events: IEvent[]) => any;
  startAt: number;
  finishAt: number;
  step?: number;
  width: number;
}

export interface IDailyRoutineState {
  height: number;
  hoveredEl: React.ReactNode;
  hoveredEvent?: IEvent;
}

const Y_HEIGHT_BIG = 56;
const Y_HEIGHT_LITTLE = 8;
const X_OFFSET = 24;

export class TimeLineTsx extends React.PureComponent<IDailyRoutineProps, IDailyRoutineState> {
  state = {
    height: Y_HEIGHT_LITTLE,
    hoveredEl: null,
    hoveredEvent: undefined,
  };

  timer: any;

  render() {
    const { classes, events, getRef, width } = this.props;
    const { height, hoveredEl, hoveredEvent } = this.state;
    const preparedEvents = events.filter(this.filterEvents);

    return (
      <div
        ref={getRef}
        className={classes.root}
        style={{ height }}
        onClick={this.increaseHeight}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.decreaseHeight}
      >
        {preparedEvents.map(event => (
          <div
            key={event.startAt.toString()}
            className={classes.block}
            style={{
              ...this.getStyle(event),
              left: this.getPosition(event.startAt),
              width: this.getWidth(event),
            }}
            onMouseOver={this.handleHover(event)}
            onMouseLeave={this.handlePopoverClose}
          />
        ))}
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.popoverPaper,
          }}
          open={Boolean(hoveredEl)}
          anchorEl={hoveredEl}
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: 'center',
            vertical: 'center',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>{get(hoveredEvent, 'name')}</Typography>
          <Typography>
            {this.getHoursWithMinutes(get(hoveredEvent, 'startAt'))} -{' '}
            {this.getHoursWithMinutes(get(hoveredEvent, 'finishAt'))}
          </Typography>
        </Popover>
        <svg height={height} width={width} className={classes.svg}>
          {this.getLines().map(({ x, isHour, label }, i) => (
            <React.Fragment key={x}>
              {label &&
                height === Y_HEIGHT_BIG && (
                  <text x={x + X_OFFSET} y="14" className={classes.text}>
                    <tspan x={x + X_OFFSET} textAnchor="middle">
                      {label}
                      :00
                    </tspan>
                  </text>
                )}
              <line
                // stroke="#FAB203"
                stroke={orange[300]}
                x1={x + X_OFFSET}
                y1={
                  isHour
                    ? height === Y_HEIGHT_BIG
                      ? 17
                      : 0
                    : height === Y_HEIGHT_BIG
                      ? height - (i % 2 ? 8 : 17)
                      : height - 3
                }
                x2={x + X_OFFSET}
                y2={height}
              />
            </React.Fragment>
          ))}
        </svg>
      </div>
    );
  }

  private handleHover = (hoveredEvent: IEvent) => (e: React.SyntheticEvent) => {
    this.setState({
      hoveredEl: e.currentTarget,
      hoveredEvent,
    });
  };

  private handlePopoverClose = () => {
    this.setState({ hoveredEl: null });
  };

  private getPosition(el?: moment.Moment) {
    const svgWidth = this.getSvgWidth();
    const res = ((this.getHours(el) - this.props.startAt) * svgWidth) / (this.props.finishAt - this.props.startAt);
    return res >= 0 ? res + X_OFFSET : X_OFFSET;
  }

  private getWidth(el: IEvent) {
    return this.getPosition(el.finishAt) - this.getPosition(el.startAt);
  }

  private getStyle(el: IEvent) {
    if (el.isActive) {
      return {
        backgroundColor: '#FFF0B5',
        borderBottomWidth: 1,
        borderColor: '#FFB200',
        borderLeftWidth: 2,
        borderRadius: 4,
        borderRightWidth: 2,
        borderStyle: 'solid',
        borderTopWidth: 1,
      };
    }
    return {
      backgroundColor: '#D5D5D5',
      borderColor: grey[400],
      borderRadius: 4,
      borderStyle: 'solid',
      borderWidth: 1,
    };
  }

  private filterEvents = (el: IEvent) => {
    return !el.finishAt || (el.finishAt.day() === moment().day() && this.getHours(el.finishAt) > this.props.startAt);
  };

  private getLines() {
    const { finishAt, startAt } = this.props;
    const svgWidth = this.getSvgWidth();
    const parts = (finishAt - startAt) * 4;
    const step = svgWidth / parts;
    const arr = new Array(parts).fill(0).map((_, i) => ({
      isHour: !(i % 4),
      label: !(i % 4) && `${Math.ceil(i / 4 + startAt)}`,
      x: step * i,
    }));
    arr.push({ x: svgWidth, isHour: true, label: `${finishAt}` });
    return arr;
  }

  private getSvgWidth() {
    const { width } = this.props;
    return width - 2 * X_OFFSET;
  }

  private increaseHeight = () => {
    this.setState({ height: Y_HEIGHT_BIG }, () => {
      this.clearTimer();
    });
  };

  private handleMouseEnter = () => {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.increaseHeight();
    }, 500);
  };

  private decreaseHeight = () => {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.setState({ height: Y_HEIGHT_LITTLE }, () => {
        this.clearTimer();
      });
    }, 1200);
  };

  private clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };

  private getHours = (el?: moment.Moment) => {
    const current = moment();
    return el
      ? el.day() === current.day()
        ? el.hours() + el.minutes() / 60
        : this.props.startAt
      : current.hours() + current.minutes() / 60;
  };

  private getHoursWithMinutes = (el?: moment.Moment) => {
    const current = moment();
    if (el) {
      if (el.day() === current.day()) {
        return el.format('HH:mm');
      } else {
        return el.format('DD.MM HH:mm');
      }
    } else {
      return current.format('HH:mm');
    }
  };
}
