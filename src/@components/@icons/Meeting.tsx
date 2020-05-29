import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

export default function Meeting(props) {
  return (
    <SvgIcon {...props}>
      <title>meeting</title>
      <path transform="translate(4, 4)" d="M7.18,10.75l5.56,2.93v-12L7.18,4.59Z" />
      <path transform="translate(4, 4)" d="M14.05,7.18H16v1H14.05Z" />
      <path transform="translate(4, 4)" d="M15.18,4l.37.9-1.8.74-.37-.9Z" />
      <path transform="translate(4, 4)" d="M15.18,11.3l-1.8-.74.37-.9,1.8.74Z" />
      <path
        transform="translate(4, 4)"
        d="M6.21,4.91H2v1H1.79a1.79,1.79,0,0,0,0,3.58H2v1H3l1.08,3.91H7.28L6.21,10.59Z"
      />
    </SvgIcon>
  );
}
