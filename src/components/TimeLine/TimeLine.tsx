import * as moment from 'moment';
import * as React from 'react';

import { IEvent } from 'src/@types';

export interface IDailyRoutineProps {
  classes: any;
  getRef: any;
  // первое событие всегда являетя отчетным неизменяемым периодом, начало этого события нельзя изменить - только конец
  // это, как правило, должно быть сном
  events: IEvent[];
  onChange: (events: IEvent[]) => any;
  startAt: number;
  finishAt: number;
  step?: number;
  width: number;
}

export interface IDailyRoutineState {
  height: number;
}

const Y_HEIGHT_BIG = 56;
const Y_HEIGHT_LITTLE = 8;
const X_OFFSET = 20;

export class TimeLineTsx extends React.PureComponent<IDailyRoutineProps, IDailyRoutineState> {
  state = {
    height: Y_HEIGHT_LITTLE,
  };

  timer: any;

  render() {
    const { classes, events, getRef, width } = this.props;
    const { height } = this.state;
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
            className={classes.block}
            style={{
              backgroundColor: this.getColor(event),
              borderColor: this.getBorderColor(event),
              left: this.getPosition(event.startAt),
              width: this.getWidth(event),
            }}
          />
        ))}
        <svg height={height} width={width} className={classes.svg}>
          {this.getLines().map(({ x, y, label }) => (
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
                stroke="#D8DDE6"
                x1={x + X_OFFSET}
                y1={y ? (height === Y_HEIGHT_BIG ? 16 : 2) : height === Y_HEIGHT_BIG ? height - 8 : height - 2}
                x2={x + X_OFFSET}
                y2={height}
              />
            </React.Fragment>
          ))}
        </svg>
      </div>
    );
  }

  private getPosition(el?: moment.Moment) {
    const svgWidth = this.getSvgWidth();
    const res = ((this.getHours(el) - this.props.startAt) * svgWidth) / (this.props.finishAt - this.props.startAt);
    return res >= 0 ? res : 0;
  }

  private getWidth(el: IEvent) {
    return this.getPosition(el.finishAt) - this.getPosition(el.startAt);
  }

  private getColor(el: IEvent) {
    return el.isActive ? '#FFF0B5' : '#99ABB8';
  }

  private getBorderColor(el: IEvent) {
    return el.isActive ? '#FFB200' : '#6D645F';
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
      label: !(i % 4) && `${Math.ceil(i / 4 + startAt)}`,
      x: step * i,
      y: !(i % 4),
    }));
    arr.push({ x: svgWidth, y: true, label: `${finishAt}` });
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
    }, 500);
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
}
