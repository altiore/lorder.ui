import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme): any => ({
  above: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    justifyContent: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  img: {
    maxWidth: '100%',
    objectFit: 'contain',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
  },
});
