import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  componentsWrap: {
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      flexFlow: 'column',
      justifyContent: 'center',
      margin: '20px 0',
    },
  },
  usersActivityWrap: {
    background: '#fff',
    padding: '50px 0',
  },
}));
