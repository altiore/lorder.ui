import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles';
import get from 'lodash-es/get';
import minBy from 'lodash-es/minBy';
import * as moment from 'moment';
import * as React from 'react';
import * as Popover from 'react-popover';

import { IEvent } from 'src/@types';
import { HoverInfo } from './HoverInfo';

export interface IDailyRoutineProps {
  classes: any;
  getRef: any;
  events: IEvent[];
  onEventClick?: (ev: IEvent) => any;
  theme: Theme;
  EditEvent?: any;
  step?: number;
  width: number;
}

export interface IDailyRoutineState {
  editedEvent?: IEvent;
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
    editedEvent: undefined,
    finishAt: 24,
    height: Y_HEIGHT_LITTLE,
    hoveredEl: null,
    hoveredEvent: undefined,
    startAt: 6,
  };

  heightTimer: any;
  updateInterval: any;
  leaveTimer: any;
  mainRef: React.ReactNode;

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
    const { classes, events, EditEvent, getRef, theme, width } = this.props;
    const { height, hoveredEl, hoveredEvent, editedEvent } = this.state;
    const preparedEvents = events.filter(this.filterEvents);
    const isExpended = height === Y_HEIGHT_BIG;

    return (
      <ClickAwayListener onClickAway={this.decreaseHeightNow}>
        <Popover
          style={{ zIndex: 1 }}
          preferPlace="below"
          isOpen={Boolean(editedEvent)}
          target={this.mainRef as any}
          tipSize={0.01}
          body={
            <Paper className={classes.popoverPaper}>
              <EditEvent initialValues={get(editedEvent, 'data', {})} onClose={this.handleEditEventClose} />
            </Paper>
          }
        >
          <div
            ref={getRef}
            className={classes.root}
            style={{
              height,
              zIndex: isExpended ? 1200 : 0,
            }}
            onClick={isExpended ? undefined : this.increaseHeight}
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
              {preparedEvents.map((event, i) => {
                return (
                  <Popover
                    key={event.data.id}
                    preferPlace="below"
                    tipSize={0.01}
                    className={classes.popover}
                    isOpen={get(hoveredEvent, 'data.id') === event.data.id && !!hoveredEvent}
                    target={hoveredEl as any}
                    onOuterAction={this.handlePopoverClose}
                    body={
                      <HoverInfo
                        onOver={this.handleHover(event)}
                        onLeave={this.handlePopoverClose}
                        hoveredEvent={event}
                      />
                    }
                  >
                    <div
                      aria-owns={`popover-body-${event.data.id}`}
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
                  </Popover>
                );
              })}
            </div>
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
        </Popover>
      </ClickAwayListener>
    );
  }

  private handleEventClick = (editedEvent: IEvent) => (e: React.SyntheticEvent) => {
    const { height } = this.state;
    if (height === Y_HEIGHT_BIG) {
      e.stopPropagation();
      if (editedEvent.data.id === get(this.state.editedEvent, 'data.id')) {
        this.setState({ editedEvent: undefined });
      } else {
        this.setState({ editedEvent });
      }
    }
  };

  private handleEditEventClose = () => {
    this.setState({ editedEvent: undefined });
  };

  private handleHover = (hoveredEvent: IEvent) => (e: React.SyntheticEvent) => {
    this.cleanLeaveTimer();
    this.setState({
      hoveredEl: e.currentTarget,
      hoveredEvent,
    });
  };

  private handlePopoverClose = () => {
    this.leaveTimer = setTimeout(() => {
      this.setState({
        hoveredEl: null,
        hoveredEvent: undefined,
      });
    }, 500);
  };

  private cleanLeaveTimer = () => {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
    }
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

  private increaseHeight = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
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
    if (!this.state.editedEvent) {
      this.clearTimer();
      this.heightTimer = setTimeout(() => {
        this.setState({ height: Y_HEIGHT_LITTLE }, () => {
          this.clearTimer();
        });
      }, 10000);
    }
  };

  private decreaseHeightNow = () => {
    if (!this.state.editedEvent) {
      this.clearTimer();
      this.setState({ height: Y_HEIGHT_LITTLE });
    }
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
