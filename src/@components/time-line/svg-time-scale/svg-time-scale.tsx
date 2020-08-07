import React, { useCallback } from 'react';

import orange from '@material-ui/core/colors/orange';

import { useStyles } from './style';

const LABEL_HEIGHT = 12;
const FULL_HEIGHT = 80;

interface ISvgTimeScaleProps {
  finishAt: number;
  startAt: number;
  svgWidth: number;
  width: number;
  X_OFFSET: number;
  Y_HEIGHT_BIG: number;
  fullSize: boolean | undefined;
  height: number;
}

export const SvgTimeScale: React.FC<ISvgTimeScaleProps> = ({
  finishAt,
  startAt,
  svgWidth,
  width,
  X_OFFSET,
  Y_HEIGHT_BIG,
  fullSize,
  height,
}) => {
  const classes = useStyles();

  const getLines = useCallback(() => {
    // Узнаем разницу между текущим моментом и моментом начала задачи
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
  }, [finishAt, startAt, svgWidth]);

  return (
    <svg height={fullSize ? FULL_HEIGHT : height} width={width} className={classes.svg}>
      {getLines().map(({ x, isHour, label }) => (
        <React.Fragment key={x}>
          {label && height === Y_HEIGHT_BIG && (
            <text x={x + X_OFFSET} y={10} className={classes.text}>
              <tspan x={x + X_OFFSET} textAnchor="middle">
                {label}
                :00
              </tspan>
            </text>
          )}
          {fullSize && (
            <line
              stroke={orange[300]}
              x1={x + X_OFFSET}
              y1={LABEL_HEIGHT + 6}
              x2={x + X_OFFSET}
              y2={LABEL_HEIGHT - 4}
            />
          )}
        </React.Fragment>
      ))}
    </svg>
  );
};
