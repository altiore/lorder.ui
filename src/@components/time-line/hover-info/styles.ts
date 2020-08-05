import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popoverPaper: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      padding: `0 ${theme.spacing(1)}px`,
      pointerEvents: 'auto',
    },
    time: {
      display: 'flex',
    },
  })
);
