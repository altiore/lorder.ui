import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

export default function Magnifier(props) {
  return (
    <SvgIcon {...props}>
      <title>magnifier</title>
      <g>
        <path d="M23.34,20.16l-5.51-5.51a10.49,10.49,0,0,1-3.18,3.18l5.5,5.51a2.25,2.25,0,0,0,3.19-3.18Z" />
        <path d="M18,9a9,9,0,1,0-9,9A9,9,0,0,0,18,9ZM9,15.75A6.75,6.75,0,1,1,15.75,9,6.76,6.76,0,0,1,9,15.75Z" />
        <path d="M3.75,9h1.5A3.75,3.75,0,0,1,9,5.25V3.75A5.25,5.25,0,0,0,3.75,9Z" />
      </g>
    </SvgIcon>
  );
}
