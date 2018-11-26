import green from '@material-ui/core/colors/green';
import * as moment from 'moment';
import { createSliderWithTooltip, Range } from 'rc-slider';
// const Range = require('rc-slider/lib/Range');
import * as React from 'react';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const RangeComponent = createSliderWithTooltip(Range);

export interface IEvent {
  name: string;
  startAt: moment.Moment;
  finishAt: moment.Moment;
}

export interface IDailyRoutineProps {
  // первое событие всегда являетя отчетным неизменяемым периодом, начало этого события нельзя изменить - только конец
  // это, как правило, должно быть сном
  events: IEvent[];
  onChange: (events: IEvent[]) => any;
  step?: number;
}

export interface IDailyRoutineState {
  values: number[];
}

const DEFAULT_STEP = 900;

export class DailyRoutine extends React.PureComponent<IDailyRoutineProps, IDailyRoutineState> {
  static defaultProps = {
    step: DEFAULT_STEP /*15min * 60*/,
  };

  state = {
    values: this.props.events.map(this.getEnd),
  };

  render() {
    const { events, step } = this.props;
    const { values } = this.state;
    return (
      <div style={{ width: '100%', padding: 10 }}>
        <RangeComponent
          dots
          step={step}
          count={events.length}
          min={this.getMin()}
          max={this.getMax()}
          value={values}
          pushable={step}
          onChange={this.handleChange}
          onAfterChange={this.handleAfterChange}
          dotStyle={{
            backgroundColor: green[300],
            borderColor: 'transparent',
            bottom: 0,
            height: 4,
            marginLeft: -2,
            width: 4,
          }}
          trackStyle={events.map(_ => ({ backgroundColor: green[100] }))}
          handleStyle={[{ borderColor: green[700] }]}
          railStyle={{ backgroundColor: green[100] }}
          tipFormatter={this.tipFormatter}
        />
      </div>
    );
  }

  private getMin() {
    const {
      events: [first],
      step = DEFAULT_STEP,
    } = this.props;
    let date;
    if (first) {
      date = first.finishAt;
    } else {
      date = moment()
        .set('hours', 6)
        .set('minutes', 0);
    }
    return (
      Math.floor(
        date
          .clone()
          .subtract(3, 'hours')
          .unix() / step
      ) * step
    );
  }

  private getMax() {
    const {
      events: [first],
      step = DEFAULT_STEP,
    } = this.props;
    let date: moment.Moment;
    if (first) {
      date = first.startAt;
    } else {
      date = moment()
        .set('hours', 23)
        .set('minutes', 0);
    }
    return (
      Math.ceil(
        date
          .clone()
          .add(1, 'day')
          .set('minutes', 0)
          .unix() / step
      ) * step
    );
  }

  private handleChange = (values: number[]) => this.setState({ values });

  // TODO: выполняется два раза при каждом единичном изменении. Возможно стоит написать логику, которая будет
  // производить изменение единожды
  private handleAfterChange = (values: number[]) => {
    this.props.onChange(
      this.props.events.map((event, i) => {
        return {
          finishAt: moment.unix(values[i]),
          name: event.name,
          startAt: values[i - 1] ? moment.unix(values[i - 1]) : event.startAt,
        };
      })
    );
  };

  private tipFormatter = (value: number): React.ReactNode => {
    const { step = DEFAULT_STEP } = this.props;
    const eventIndex = this.state.values.findIndex(el => {
      const r = Math.round(el / step) * step;
      return r === value;
    });
    if (~eventIndex) {
      const event = this.props.events[eventIndex];
      return `Окончание "${event ? event.name : ''}" - ${moment.unix(value).format('HH:mm')}`;
    }
    return `${moment.unix(value).format('HH:mm')}`;
  };

  private getEnd(event: IEvent) {
    return event.finishAt.clone().unix();
  }
}
