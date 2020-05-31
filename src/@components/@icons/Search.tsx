import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

export default function Search(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14">
      <title>search</title>
      <path d="M13.9,12.8L10.2,9c0.7-0.9,1.2-2.2,1.2-3.4C11.3,2.5,8.8,0,5.7,0C2.6,0,0,2.6,0,5.7c0,3.2,2.5,5.7,5.7,5.7 c1.2,0,2.3-0.4,3.4-1.2l3.6,3.6C12.8,14,12.9,14,13,14s0.1,0,0.2-0.1l0.8-0.8C14,13.1,14,12.9,13.9,12.8z M9.8,5.7 c0,2.2-1.8,4-4.1,4s-4.1-1.8-4.1-4c0-2.2,1.9-4.1,4.1-4.1C8,1.7,9.8,3.5,9.8,5.7z" />
    </SvgIcon>
  );
}
