import { makeStyles, Theme } from '@material-ui/core/styles';

// import { ReactComponent as Clock1Svg } from './clock_1.svg';
import Clock1Svg from './clock_1.svg';

/* tslint:disable */
export const useStyles = makeStyles((theme: Theme) => ({
  desc: {
    fontWeight: 300,
  },
  icon: {
    backgroundColor: 'transparent',
    '& svg': {
      color: theme.palette.secondary.dark,
    },
  },
  item: {
    backgroundColor: theme.palette.primary.contrastText,
    boxShadow: 'none',
    color: theme.palette.primary.light,
    cursor: 'pointer',
    height: '100%',
    padding: theme.spacing(),
    position: 'relative',
    minHeight: '30vh',
    '&:hover': {
      backgroundColor: '#29292b',
      backgroundImage: 'linear-gradient(45deg, #29292b 0%, #424247 50%, #29292b 100%)',
      boxShadow: theme.shadows[4],
      color: theme.palette.primary.contrastText,
      '& $svgWrap': {
        display: 'block',
      },
    },
  },
  svgWrap: {
    backgroundImage: `url("${Clock1Svg}")`,
    display: 'none',
    opacity: 0.5,
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: '95px',
    height: '140px',
  },
  title: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 400,
  },
}));
