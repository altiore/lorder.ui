import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

export default function Magnifier(props) {
  return (
    <SvgIcon {...props}>
      <title>magnifier</title>
      <path d="M20.51,18.12,16.38,14A8.25,8.25,0,0,1,14,16.38l4.13,4.12a1.69,1.69,0,0,0,2.39-2.38Z" />
      <path d="M16.5,9.75A6.75,6.75,0,1,0,9.75,16.5,6.75,6.75,0,0,0,16.5,9.75ZM9.75,14.81a5.06,5.06,0,1,1,5.06-5.06A5.07,5.07,0,0,1,9.75,14.81Z" />
      <path d="M5.54,9.65H6.72A2.93,2.93,0,0,1,9.65,6.72V5.54A4.12,4.12,0,0,0,5.54,9.65Z" />
    </SvgIcon>
  );
}
