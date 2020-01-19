import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: theme.palette.background.paper,
  },
  hoveredItems: {
    marginTop: theme.spacing(2),
  },
}));
