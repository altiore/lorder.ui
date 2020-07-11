import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      marginBottom: 20,
      marginTop: 20,
    },
    basketIcon: {
      '&:hover': {
        color: 'red',
        cursor: 'pointer',
      },
    },
    basketWrap: {
      position: 'absolute',
      right: 4,
      top: '50%',
      transform: 'translateY(-50%)',
    },
    circularRemoveWrap: {
      position: 'absolute',
      right: 50,
      top: '50%',
      transform: 'translateY(-50%)',
    },
    circularWrap: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px 0',
      width: '100%',
    },
    commentsWrap: {
      maxWidth: '750px',
    },
    inline: {
      display: 'block',
      maxWidth: '90%',
      wordBreak: 'break-word',
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
    },
    textareaWrap: {
      background: 'transparent',
      marginBottom: 20,
      marginTop: 20,
    },
  })
);
