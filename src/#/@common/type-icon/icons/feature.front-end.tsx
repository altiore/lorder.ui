import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

export default function FeatureFrontEnd(props) {
  return (
    <SvgIcon {...props}>
      <title>Feature Front End</title>
      <path d="M18.21,10.75a6.85,6.85,0,0,1,.79,0V7a2,2,0,0,0-2-2H13V3.5a2.5,2.5,0,0,0-5,0V5H4A2,2,0,0,0,2,7v3.8H3.5a2.7,2.7,0,0,1,0,5.4H2V20a2,2,0,0,0,2,2H7.8V20.5a2.7,2.7,0,0,1,2.7-2.7l.23,0A7.5,7.5,0,0,1,18.21,10.75Z" />
      <path d="M18.25,12.5A5.75,5.75,0,1,0,24,18.25,5.74,5.74,0,0,0,18.25,12.5Zm0,9.25a3.5,3.5,0,1,1,3.5-3.5A3.5,3.5,0,0,1,18.25,21.75Z" />
      <circle cx="18.25" cy="18.25" r="2" />
    </SvgIcon>
  );
}
