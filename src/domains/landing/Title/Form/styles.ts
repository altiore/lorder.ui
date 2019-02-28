import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme): any => ({
  button: {
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
  },
  wrapper: {
    flexGrow: 1,
  },
});
