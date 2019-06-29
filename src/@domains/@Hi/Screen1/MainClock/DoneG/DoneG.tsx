import React from 'react';

import { useStyles } from './styles';

interface IMainClockIco {
  donePercent?: number;
}

const DoneG: React.FC<IMainClockIco> = ({ donePercent = 12 }) => {
  const classes = useStyles();

  return (
    <>
      <defs>
        <linearGradient id="doneArc" x1="176.37" y1="381.07" x2="231.43" y2="381.07" xlinkHref="#a" />
        <linearGradient id="doneText" x1="196.67" y1="396.57" x2="207.1" y2="396.57" xlinkHref="#a" />
      </defs>
      <path
        className={classes.doneArc}
        d="M178.56,394.83h0a25.34,25.34,0,0,1,50.68,0h2.19a27.53,27.53,0,0,0-55.06,0h2.19Z"
      />
      <g transform="translate(205,404)">
        <text className={classes.doneText}>
          <tspan textAnchor="middle">{donePercent}%</tspan>
        </text>
      </g>
    </>
  );
};

export default DoneG;
