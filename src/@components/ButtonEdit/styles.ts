import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes HoverAndRotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    },
    '50%': {
      transform: 'rotate(180deg)',
    },
  },
  editButton: {
    '&:hover': {
      '& > span > svg': {
        animation: '$HoverAndRotate 0.3s',
      },
    },
    backgroundColor: 'transparent',
    borderColor: 'rgb(197, 197, 197)',
    borderRadius: 18,
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#ffffff',
    height: 36,
    width: 170,
  },
  editButtonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 300,
    marginLeft: 13,
  },
  editButtonTextGray: {
    color: '#232323',
  },
  settingsIcon: {
    fontSize: 28,
    left: 5,
    position: 'absolute',
  },
  settingsIconGray: {
    color: '#c5c5c5',
  },
}));
