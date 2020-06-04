import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

export default function OpenProject(props) {
  return (
    <SvgIcon {...props}>
      <title>open project</title>
      <path
        fill="#a4a4a4"
        d="M21.82,2.19H2.18A2.19,2.19,0,0,0,0,4.37V8.73H2.18V4.35H21.82V19.66H2.18V15.27H0v4.38a2.17,2.17,0,0,0,2.18,2.16H21.82A2.17,2.17,0,0,0,24,19.65V4.37A2.19,2.19,0,0,0,21.82,2.19Z"
      />
      <polygon
        fill="#faf0b5"
        points="10.91 16.36 15.27 12 10.91 7.64 10.91 10.91 0 10.91 0 13.09 10.91 13.09 10.91 16.36"
      />
    </SvgIcon>
  );
}
