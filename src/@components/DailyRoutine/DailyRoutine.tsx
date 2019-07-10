import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import debounce from 'lodash/debounce';
import moment from 'moment';
import { createSliderWithTooltip, Range } from 'rc-slider';
import React from 'react';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import { IEvent } from '@types';

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
    values: this.prepareValues(this.props),
  };

  private handleAfterChange = debounce(
    (numberValues: number[]) => {
      const values = this.convertNumbersToEvents(numberValues);
      this.props.onChange(values.filter(({ data }) => !!data));
    },
    3000,
    { leading: false, trailing: true }
  );

  componentWillReceiveProps(nextProps: Readonly<IDailyRoutineProps>, nextContext: any): void {
    if (this.props.events !== nextProps.events) {
      this.setState({ values: this.prepareValues(nextProps) });
    }
  }

  render() {
    const { step } = this.props;
    const { values } = this.state;
    return (
      <div style={{ width: '100%', padding: 10 }}>
        <RangeComponent
          allowCross={false}
          dots
          step={step}
          count={values.length}
          min={this.getMin()}
          max={this.getMax()}
          value={this.getNumberValues()}
          pushable={false}
          onChange={this.handleChange}
          onAfterChange={this.handleAfterChange}
          dotStyle={{
            backgroundColor: `rgba(129, 199, 132, .1)`,
            borderColor: 'transparent',
            bottom: -1,
            height: 6,
            marginLeft: -3,
            width: 6,
          }}
          trackStyle={values.map(({ data, isActive }) => ({
            backgroundColor: data ? (isActive ? green[100] : red[100]) : grey[100],
          }))}
          handleStyle={values.map(({ data, isActive }) => ({
            borderColor: data ? (isActive ? green[700] : red[300]) : grey[100],
          }))}
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
    events.forEach(event => {
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

  private prepareValues(props: IDailyRoutineProps) {
    let prepared = [...props.events].sort((a, b) => (a.startAt.unix() > b.startAt.unix() ? 1 : -1));
    prepared = prepared.reduce((res: IEvent[], current: IEvent, i: number, arr: IEvent[]) => {
      res.push(current);
      // превращаем пустые диапазоны (время, когда нет задач) в удаленные задачи,
      // чтоб их можно было превратить в реальные задачи
      if (current.finishAt && arr[i + 1] && current.finishAt.unix() < arr[i + 1].startAt.unix()) {
        res.push({
          data: null,
          finishAt: arr[i + 1].startAt,
          isActive: true,
          name: 'Удаленная задача',
          startAt: current.finishAt,
        });
      }
      return res;
    }, []);
    return prepared;
  }

  // private getFinish(event: IEvent): number {
  //   if (event.finishAt) {
  //     return event.finishAt.clone().unix();
  //   }
  //   return moment().unix();
  // }
}
