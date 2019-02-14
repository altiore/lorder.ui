import * as React from 'react';

import { IEvent } from 'src/@types';

export interface IDailyRoutineProps {
  classes: any;
  getRef: any;
  // первое событие всегда являетя отчетным неизменяемым периодом, начало этого события нельзя изменить - только конец
  // это, как правило, должно быть сном
  events: IEvent[];
  onChange: (events: IEvent[]) => any;
  step?: number;
  width: number;
}

export interface IDailyRoutineState {
  values: IEvent[];
}

export class TimeLineTsx extends React.PureComponent<IDailyRoutineProps, IDailyRoutineState> {
  render() {
    const { classes, getRef, width } = this.props;
    const svgWidth = width;
    return (
      <div ref={getRef} className={classes.root}>
        <svg height={50} width={svgWidth} className={classes.svg}>
          {this.getLines(svgWidth - 20).map(({ x, y, label }) => (
            <React.Fragment>
              {label && (
                <text x={x + 8} y="14" className={classes.text}>
                  {label}
                </text>
              )}
              <line key={x} stroke="#24292E" x1={x + 10} y1="16" x2={x + 10} y2={y + 16} />
            </React.Fragment>
          ))}
        </svg>
        <div className={classes.block}>hover</div>
      </div>
    );
  }

  private getLines(width: number) {
    const parts = 10 * 4;
    const step = width / parts;
    const arr = new Array(parts).fill(0).map((_, i) => ({
      label: !(i % 4) && `${Math.ceil(i / 4 + 8)}`,
      x: step * i,
      y: i % 4 ? 5 : 20,
    }));
    arr.push({ x: width, y: 20, label: '18' });
    return arr;
  }
}
