import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme): any => ({
  bottomBar: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    height: 80,
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    },
  },
  hiBody: {
    overflowX: 'hidden',
  },
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
});
