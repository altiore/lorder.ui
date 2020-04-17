import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(() => ({
  root: {
    fill: 'url(#linear-gradient)',
  },
}));

export default function Telegram(props) {
  const { root } = useStyles();

  return (
    <SvgIcon {...props}>
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="2"
          y1="12"
          x2="22"
          y2="12"
          gradientTransform="matrix(1, 0, 0, -1, 0, 24)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d1bf73" />
          <stop offset="0.55" stopColor="#f9edad" />
          <stop offset="1" stopColor="#bfa759" />
        </linearGradient>
      </defs>
      <title>telegram</title>
      <path
        className={root}
        d="M6.81,13.39,9.3,19.61l3.24-3.23,5.55,4.41L22,3.21,2,11.54Zm9.48-5.14-6.13,5.59L9.4,16.71,8,13.19Z"
      />
    </SvgIcon>
  );
}
