import React from 'react';

import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export default function Comment(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <title>comment</title>
      <path d="M20,3.76H4a3,3,0,0,0-3,3v9.77a3,3,0,0,0,3,3V24l6.37-4.43H20a3,3,0,0,0,3-3V6.78A3,3,0,0,0,20,3.76ZM17.11,15.1H6.89V13.81H17.11Zm0-2.75H6.89V11.06H17.11Zm0-2.75H6.89V8.31H17.11Z" />
    </SvgIcon>
  );
}
