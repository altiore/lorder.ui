import { makeStyles, Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    svg: {
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
    },
    text: {
      fill: '#757575',
      fontSize: 12,
    },
  })
);
