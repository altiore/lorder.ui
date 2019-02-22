import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import Popover from '@material-ui/core/Popover';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import get from 'lodash-es/get';
import minBy from 'lodash-es/minBy';
import * as moment from 'moment';
import * as React from 'react';

import { IEvent } from 'src/@types';

export interface IDailyRoutineProps {
  classes: any;
  getRef: any;
  events: IEvent[];
  onEventClick?: (ev: IEvent) => any;
  theme: Theme;
  step?: number;
  width: number;
}

export interface IDailyRoutineState {
  finishAt: number;
  height: number;
  hoveredEl: React.ReactNode;
  hoveredEvent?: IEvent;
  startAt: number;
}

export const Y_HEIGHT_BIG = 82;
const Y_HEIGHT_LITTLE = 8;
const X_OFFSET = 24;
const LABEL_HEIGHT = 12;

export class TimeLineTsx extends React.PureComponent<IDailyRoutineProps, IDailyRoutineState> {
  state = {
    finishAt: 24,
    height: Y_HEIGHT_LITTLE,
    hoveredEl: null,
    hoveredEvent: undefined,
    startAt: 6,
  };

  heightTimer: any;
  updateInterval: any;

  componentDidMount(): void {
    this.setState({
      finishAt: this.getFinishAt(),
      startAt: this.getStartAt(),
    });
    this.updateInterval = setInterval(() => {
      this.setState({
        finishAt: this.getFinishAt(),
        startAt: this.getStartAt(),
      });
    }, 600000);
  }

  componentWillUnmount(): void {
    if (this.heightTimer) {
      clearTimeout(this.heightTimer);
    }
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  render() {
    const { classes, events, getRef, theme, width } = this.props;
    const { height, hoveredEl, hoveredEvent } = this.state;
    const preparedEvents = events.filter(this.filterEvents);
    const isExpended = height === Y_HEIGHT_BIG;

    return (
      <ClickAwayListener onClickAway={this.decreaseHeightNow}>
        <div
          ref={getRef}
          className={classes.root}
          style={{
            height,
            zIndex: isExpended ? 1200 : 0,
          }}
          onClick={this.increaseHeight}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.decreaseHeight}
        >
          <div
            className={classes.filled}
            style={{
              boxShadow: isExpended ? theme.shadows[1] : 'none',
              flexBasis: isExpended ? '76%' : '100%',
            }}
          >
            {preparedEvents.map((event, i) => (
              <div
                key={event.data.id || i}
                className={classes.block}
                style={{
                  ...this.getStyle(event),
                  left: this.getPosition(event.startAt),
                  width: this.getWidth(event),
                }}
                onClick={this.handleEventClick(event)}
                onMouseOver={this.handleHover(event)}
                onMouseLeave={this.handlePopoverClose}
              />
            ))}
          </div>
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
              vertical: 'top',
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
            {this.getLines().map(({ x, isHour, label }) => (
              <React.Fragment key={x}>
                {label &&
                  height === Y_HEIGHT_BIG && (
                    <text x={x + X_OFFSET} y={LABEL_HEIGHT} className={classes.text}>
                      <tspan x={x + X_OFFSET} textAnchor="middle">
                        {label}
                        :00
                      </tspan>
                    </text>
                  )}
                {isExpended && (
                  <line
                    // stroke="#FAB203"
                    stroke={orange[300]}
                    x1={x + X_OFFSET}
                    y1={LABEL_HEIGHT + 2}
                    x2={x + X_OFFSET}
                    y2={LABEL_HEIGHT + 8}
                  />
                )}
              </React.Fragment>
            ))}
          </svg>
        </div>
      </ClickAwayListener>
    );
  }

  private handleEventClick = (event: IEvent) => (e: React.SyntheticEvent) => {
    const { height } = this.state;
    if (height === Y_HEIGHT_BIG) {
      e.stopPropagation();
      const { onEventClick } = this.props;
      if (onEventClick) {
        onEventClick(event);
      }
    }
  };

  private handleHover = (hoveredEvent: IEvent) => (e: React.SyntheticEvent) => {
    this.setState({
      hoveredEl: e.currentTarget,
      hoveredEvent,
    });
  };

  private handlePopoverClose = () => {
    this.setState({
      hoveredEl: null,
      hoveredEvent: undefined,
    });
  };

  private getPosition(el?: moment.Moment) {
    const { startAt, finishAt } = this.state;
    const svgWidth = this.getSvgWidth();
    const res = ((this.getHours(el) - startAt) * svgWidth) / (finishAt - startAt);
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
    const { startAt } = this.state;
    return !el.finishAt || (el.finishAt.day() === moment().day() && this.getHours(el.finishAt) > startAt);
  };

  private getLines() {
    const { startAt, finishAt } = this.state;
    const svgWidth = this.getSvgWidth();
    const parts = (finishAt - startAt) * 4;
    if (parts <= 0) {
      return [];
    }
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
    this.heightTimer = setTimeout(() => {
      this.increaseHeight();
    }, 500);
  };

  private decreaseHeight = () => {
    this.clearTimer();
    this.heightTimer = setTimeout(() => {
      this.setState({ height: Y_HEIGHT_LITTLE }, () => {
        this.clearTimer();
      });
    }, 10000);
  };

  private decreaseHeightNow = () => {
    this.clearTimer();
    this.setState({ height: Y_HEIGHT_LITTLE });
  };

  private clearTimer = () => {
    if (this.heightTimer) {
      clearInterval(this.heightTimer);
    }
  };

  private getHours = (el?: moment.Moment) => {
    const current = moment();
    return el
      ? el.day() === current.day()
        ? el.hours() + el.minutes() / 60
        : this.state.startAt
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

  private getStartAt = (): number => {
    const current = moment();
    const first = minBy(
      this.props.events,
      (ev: IEvent) => (ev.startAt.day() === current.day() ? ev.startAt.hours() : 24)
    );
    const hours = first ? first.startAt.hours() : 0;
    return first && hours < current.hours() ? hours : 0;
  };

  private getFinishAt = (): number => {
    const hours = moment().hours();
    return hours < 24 ? (hours < 23 ? hours + 2 : hours + 1) : 24;
  };
}
