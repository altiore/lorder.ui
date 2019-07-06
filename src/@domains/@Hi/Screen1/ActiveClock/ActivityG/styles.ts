import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  activity: {
    fill: 'url(#text)',
    font: 'bold 20px sans-serif',
  },
  title: {
    fill: 'url(#text)',
    font: 'bold 10px sans-serif',
  },
}));
