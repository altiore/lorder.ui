import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  doneArc: {
    fill: 'url(#doneArc)',
  },
  doneText: {
    fill: 'url(#doneText)',
    font: 'bold 20px sans-serif',
  },
}));
