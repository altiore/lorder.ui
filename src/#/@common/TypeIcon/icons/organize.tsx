import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

export default function Organization(props) {
  return (
    <SvgIcon {...props}>
      <title>Organization</title>
      <path d="M10.94,15.53l7.23,3.8V3.73L10.94,7.51Z" />
      <path d="M19.86,10.88H22.4v1.3H19.86Z" />
      <path d="M21.34,6.75l.47,1.17-2.34,1L19,7.71Z" />
      <path d="M21.34,16.24l-2.34-1,.47-1.17,2.34,1Z" />
      <path d="M9.67,7.93H4.21v1.3H3.93a2.33,2.33,0,0,0,0,4.66h.28v1.3H5.5l1.41,5.08h4.16l-1.4-4.95Z" />
    </SvgIcon>
  );
}
