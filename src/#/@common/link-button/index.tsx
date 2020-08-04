import { connect } from 'react-redux';

import { push } from 'connected-react-router';

import Button, { ButtonProps } from '@material-ui/core/Button';

const mapDispatchToProps = {
  push,
};

function handleClick(goTo: any, to: string) {
  return function(e: any) {
    e.preventDefault();
    goTo(to);
  };
}

const mergeProps = (state: any, { push: localPush, ...restDispatch }: any, { to, ...restOwn }: any) => ({
  ...restDispatch,
  ...restOwn,
  href: to,
  onClick: handleClick(localPush, to),
});

export const LinkButton: React.ComponentType<ButtonProps & { to: string }> = connect(
  undefined,
  mapDispatchToProps,
  mergeProps
)(Button);
