import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  blockTexts: {
    alignItems: 'justify',
    color: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 2, 8),
  },
  content: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 0),
      '& div:nth-child(2)': {
        padding: theme.spacing(0, 0, 0, 2),
      },
    },
  },
  svgIconBlock: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    maxWidth: `100vw`,
    '& svg': {
      width: '100vw',
      [theme.breakpoints.up('sm')]: {
        width: 536.61,
        height: 500,
      },
    },
  },
  title: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    height: theme.mixins.toolbar.height,
  },
}));
