import { Theme } from '@material-ui/core';

export const styles = (theme: Theme): any => ({
  button: {
    marginTop: 30,
    maxWidth: 300,
  },
  range: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '14px 0',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    textAlign: 'center',
  },
  root2: {
    flexGrow: 1,
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 46,
    },
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
});
