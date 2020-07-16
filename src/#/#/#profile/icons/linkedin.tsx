import React from 'react';

import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export default function LinkedIn(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <title>LinkedIn</title>
      <rect y="7.5" width="5.37" height="16.5" />
      <path d="M20,7.69l-.17-.05-.22,0a4.67,4.67,0,0,0-1-.1,7.47,7.47,0,0,0-5.76,3.15V7.5H7.5V24h5.37V15s4.05-5.65,5.76-1.5V24H24V12.87A5.36,5.36,0,0,0,20,7.69Z" />
      <circle cx="2.63" cy="2.63" r="2.63" />
    </SvgIcon>
  );
}
