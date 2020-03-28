import React from 'react';
import { connect } from 'react-redux';

import { push } from 'connected-react-router';

import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';

const mapDispatchToProps = {
  push,
};

const mergeProps = (state: any, { push, ...restDispatch }: any, { to, ...restOwn }: any) => ({
  ...restDispatch,
  ...restOwn,
  onClick: () => push(to),
});

export const LinkIconButton: React.ComponentType<IconButtonProps & { to: string }> = connect(
  undefined,
  mapDispatchToProps,
  mergeProps
)(IconButton);
