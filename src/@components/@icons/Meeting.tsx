import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

export default function Meeting(props) {
  return (
    <SvgIcon {...props}>
      <title>communication</title>
      <path d="M10.77,16.07l8.34,4.39v-18L10.77,6.82Z" />
      <path d="M21.07,10.71H24v1.5H21.07Z" />
      <path d="M22.77,5.94l.55,1.35L20.62,8.4l-.55-1.35Z" />
      <path d="M22.77,16.89l-2.7-1.11.55-1.35,2.7,1.11Z" />
      <path d="M9.31,7.3H3V8.8H2.68a2.69,2.69,0,0,0,0,5.38H3v1.5H4.5l1.62,5.86h4.8L9.31,15.83Z" />
    </SvgIcon>
  );
}
