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
      '& div:nth-child(2)': {
        padding: theme.spacing(0, 0, 0, 2),
      },
      padding: theme.spacing(2, 0),
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
  },
  title: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    height: theme.mixins.toolbar.height,
  },
}));
