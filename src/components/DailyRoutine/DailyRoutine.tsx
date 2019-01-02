import green from '@material-ui/core/colors/green';
import debounce from 'lodash-es/debounce';
import * as moment from 'moment';
import { createSliderWithTooltip, Range } from 'rc-slider';
import * as React from 'react';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import { IEvent } from 'src/@types';

const RangeComponent = createSliderWithTooltip(Range);

export interface IDailyRoutineProps {
  // первое событие всегда являетя отчетным неизменяемым периодом, начало этого события нельзя изменить - только конец
  // это, как правило, должно быть сном
  events: IEvent[];
  onChange: (events: IEvent[]) => any;
  step?: number;
}

export interface IDailyRoutineState {
  values: IEvent[];
}

const DEFAULT_STEP = 900;

export class DailyRoutine extends React.PureComponent<IDailyRoutineProps, IDailyRoutineState> {
  static defaultProps = {
    step: DEFAULT_STEP /*15min * 60*/,
  };

  state = {
    values: this.props.events.sort((a, b) => (a.startAt.unix() > b.startAt.unix() ? 1 : -1)),
  };

  // TODO: выполняется два раза при каждом единичном изменении. Возможно стоит написать логику, которая будет
  // производить изменение единожды
  private handleAfterChange = debounce(
    (numberValues: number[]) => {
      const values = this.convertNumbersToEvents(numberValues);
      this.props.onChange(values);
    },
    3000,
    { leading: false, trailing: true }
  );

  render() {
    const { events, step } = this.props;
    return (
      <div style={{ width: '100%', padding: 10 }}>
        <RangeComponent
          allowCross={false}
          dots
          step={step}
          count={events.length}
          min={this.getMin()}
          max={this.getMax()}
          value={this.getNumberValues()}
          pushable={false}
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

  // private getTabIndexes(): number[] {
  //   return this.state.values.map((_, i: number) => i);
  // }

  private getMinDate(): moment.Moment {
    const { events } = this.props;
    let minDate = moment();
    events.map(event => {
      if (minDate.diff(event.startAt, 'hours') > 1) {
        minDate = event.startAt;
      }
    });
    return minDate;
  }

  private getMin() {
    const { step = DEFAULT_STEP } = this.props;
    const minDate = this.getMinDate();
    return (
      Math.floor(
        minDate
          .clone()
          .subtract(1, 'hours')
          .set('minutes', 0)
          .unix() / step
      ) * step
    );
  }

  private getMax() {
    const { step = DEFAULT_STEP } = this.props;
    return (
      Math.ceil(
        moment()
          .set('minutes', 0)
          .unix() / step
      ) * step
    );
  }

  private convertNumbersToEvents = (numberValues: number[]): IEvent[] => {
    return this.state.values.map((val, i) => {
      if (this.isEqualWithCurrent(val, numberValues[i])) {
        if (!this.state.values[i + 1] || this.isEqualWithCurrent(this.state.values[i + 1], numberValues[i + 1])) {
          return val;
        } else {
          return {
            ...val,
            finishAt: val.finishAt && moment.unix(numberValues[i + 1]),
          };
        }
      } else {
        if (!this.state.values[i + 1] || this.isEqualWithCurrent(this.state.values[i + 1], numberValues[i + 1])) {
          return {
            ...val,
            startAt: moment.unix(numberValues[i]),
          };
        } else {
          return {
            ...val,
            finishAt: val.finishAt && moment.unix(numberValues[i + 1]),
            startAt: moment.unix(numberValues[i]),
          };
        }
      }
    });
  };

  private handleChange = (numberValues: number[]) => {
    const values = this.convertNumbersToEvents(numberValues);
    this.setState({ values });
  };

  private tipFormatter = (value: number): React.ReactNode => {
    const event = this.state.values.find((el: IEvent) => this.isEqualWithCurrent(el, value));
    if (event) {
      return `"${event.name}" - ${event.startAt.format('HH:mm')}`;
    }
    return `${moment.unix(value).format('HH:mm')}`;
  };

  private isEqualWithCurrent = (el: IEvent, value: number) => {
    const { step = DEFAULT_STEP } = this.props;
    const r = Math.round(el.startAt.clone().unix() / step) * step;
    return r === value;
  };

  private getNumberValues(): number[] {
    return this.state.values.map(this.getStart);
  }

  private getStart(event: IEvent): number {
    return event.startAt.clone().unix();
  }

  // private getFinish(event: IEvent): number {
  //   if (event.finishAt) {
  //     return event.finishAt.clone().unix();
  //   }
  //   return moment().unix();
  // }
}
