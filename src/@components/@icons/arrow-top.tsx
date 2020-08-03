import React from 'react';

import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export default function ArrowTop(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <title>arrow</title>
      <path d="M12 4L0 20.1143H24L12 4Z" />
    </SvgIcon>
  );
}
