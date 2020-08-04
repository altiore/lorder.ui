import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  button: { margin: '0 5px', width: 100 },
  currentDate: {
    fontFamily: 'Roboto',
    fontSize: 32,
    fontWeight: 300,
    textAlign: 'center',
  },
  currentTaskInfo: {
    fontSize: 17,
    fontWeight: 'normal',
    verticalAlign: 'middle',
  },
  currentTaskInfoInner: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 10,
    verticalAlign: 'inherit',
  },

  dialogContentWrap: {
    padding: '0 60px',
    [theme.breakpoints.down('md')]: {
      padding: '0 50px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px',
    },
  },
  infoBlock: { fontSize: 18, fontWeight: 500, textAlign: 'center' },
  infoBlockInner: {
    display: 'block',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
  },
}));
