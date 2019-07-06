import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  title: {
    fill: 'url(#text)',
    font: 'bold 10px sans-serif',
  },
  value: {
    fill: 'url(#text)',
    font: 'bold 15px sans-serif',
  },
}));
