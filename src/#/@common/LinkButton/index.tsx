import { connect } from 'react-redux';

import { push } from 'connected-react-router';

import Button, { ButtonProps } from '@material-ui/core/Button';

const mapDispatchToProps = {
  push,
};

function handleClick(push: any, to: string) {
  return function(e: any) {
    e.preventDefault();
    push(to);
  };
}

const mergeProps = (state: any, { push, ...restDispatch }: any, { to, ...restOwn }: any) => ({
  ...restDispatch,
  ...restOwn,
  href: to,
  onClick: handleClick(push, to),
});

export const LinkButton: React.ComponentType<ButtonProps & { to: string }> = connect(
  undefined,
  mapDispatchToProps,
  mergeProps
)(Button);
