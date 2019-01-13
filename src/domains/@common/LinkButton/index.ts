import Button, { ButtonProps } from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  push,
};

const mergeProps = (state: any, { push, ...restDispatch }: any, { to, ...restOwn }: any) => ({
  ...restDispatch,
  ...restOwn,
  onClick: () => push(to),
});

export const LinkButton: React.ComponentType<ButtonProps & { to: string }> = connect(
  undefined,
  mapDispatchToProps,
  mergeProps
)(Button);
