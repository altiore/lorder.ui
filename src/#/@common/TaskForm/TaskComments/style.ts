import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    basketIcon: {
      '&:hover': {
        color: 'red',
        cursor: 'pointer',
      },
    },
    inline: {
      display: 'inline',
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
    },
  })
);
