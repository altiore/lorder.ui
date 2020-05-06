import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: theme.palette.background.paper,
  },
  hoveredItems: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
    },
  },
}));
