import React from 'react';

import { useStyles } from './styles';

export interface IPeopleG {
  count?: string | number;
}

const PeopleG: React.FC<IPeopleG> = ({ count = '0' }) => {
  const classes = useStyles();

  return (
    <>
      <defs>
        <linearGradient id="a" x1="185.98" y1="239.93" x2="313.39" y2="239.93" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d1bf73" />
          <stop offset="0.55" stopColor="#f9edad" />
          <stop offset="1" stopColor="#bfa759" />
        </linearGradient>
        <linearGradient id="text" x1="196.67" y1="396.57" x2="207.1" y2="396.57" xlinkHref="#a" />
      </defs>
      <g transform="translate(300,50)">
        <text className={classes.title}>
          <tspan textAnchor="middle">всего активных пользователей</tspan>
        </text>
      </g>
      <g transform="translate(411,85)">
        <text className={classes.value}>
          <tspan textAnchor="middle">{count}</tspan>
        </text>
      </g>
    </>
  );
};

export default PeopleG;
