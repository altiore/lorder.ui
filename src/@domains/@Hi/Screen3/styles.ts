import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
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
  },
  svgIconBlock: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    maxWidth: `calc(100vw - ${theme.spacing(6)}px)`,
  },
  title: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    height: theme.mixins.toolbar.height,
  },
}));
