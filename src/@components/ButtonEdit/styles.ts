import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  editButton: {
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
    fontFamily: 'Montserrat',
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
