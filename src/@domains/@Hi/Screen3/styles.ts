import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  block: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
  },
  blockTexts: {
    alignItems: 'justify',
    color: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    minHeight: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(2),
  },
  content: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    padding: theme.spacing(2),
    zIndex: 1,
  },
  title: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    height: theme.mixins.toolbar.height,
  },
}));
