import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  backTitle: {
    bottom: theme.typography.pxToRem(-160),
    color: '#242327',
    fontSize: theme.typography.pxToRem(360),
    fontWeight: 'bold',
    left: 'calc(50% - 705px);',
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  blockTexts: {
    alignItems: 'justify',
    color: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    padding: theme.spacing(6, 2),
    zIndex: 1,
  },
  content: {
    backgroundColor: theme.palette.default.main,
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      '& div:nth-child(2)': {
        padding: theme.spacing(0, 0, 0, 2),
      },
      padding: theme.spacing(3, 0),
    },
  },
  svgIconBlock: {
    '& svg': {
      width: '100vw',
      [theme.breakpoints.up('sm')]: {
        height: 500,
        width: 536.61,
      },
    },
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    maxWidth: `100vw`,
    overflow: 'hidden',
    zIndex: 1,
  },
  title: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    height: theme.mixins.toolbar.height,
  },
}));
