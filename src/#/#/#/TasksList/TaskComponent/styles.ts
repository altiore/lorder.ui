import { darken, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: 129,
    },
  },
  buttonTitle: {
    '& $buttonTitleLabel': {
      color: theme.palette.pause.main,
    },
    '&:hover': {
      '& $buttonTitleSetting': {
        opacity: 1,
      },
    },
    borderRadius: '6px',
    color: theme.palette.pause.main,
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(16),
    minHeight: theme.spacing(4.5),
    padding: theme.spacing(0.5, 1, 0.5, 5),
    transition: theme.transitions.create(['background-color']),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5, 0),
    },
  },
  buttonTitleCurrent: {
    '& $buttonTitleLabel': {
      color: theme.palette.pause.dark,
    },
    '&:hover': {
      backgroundColor: theme.palette.pause.light,
    },
  },
  buttonTitleLabel: {
    '& > span': {
      fontWeight: 400,
      lineHeight: 1.4,
      maxHeight: theme.spacing(5.5),
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  buttonTitlePaused: {
    '& $buttonTitleLabel': {
      color: theme.palette.pause.main,
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    backgroundColor: '#f4f5f7',
  },
  buttonTitleSetting: {
    color: '#f6d475',
    opacity: 0,
    position: 'absolute',
    right: 4,
    top: 'calc(50% - 12px)',
    transition: theme.transitions.create(['opacity']),
  },
  duration: {
    '& > button': {
      padding: theme.spacing(0.75, 0),
      width: '100%',
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    width: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      // display: 'inline-block',
    },
  },
  listItem: {
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    boxShadow: theme.shadow.default,
    display: 'flex',
    flexGrow: 1,
    height: 60,
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1, 2, 1, 1.5),
    position: 'relative',
    transition: theme.transitions.create(['background-color', 'border-color', 'box-shadow']),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
  listItemCurrent: {
    '&:hover': {
      borderColor: darken('#eecf6d', 0.1),
    },
    backgroundColor: '#f8f1cc',
    border: '1px solid #eecf6d',
    boxShadow: theme.shadow.secondary,
  },
  listItemPaused: {
    '&:hover': {
      borderColor: darken('#f4f5f7', 0.1),
    },
    backgroundColor: '#f4f5f7',
    border: '1px solid #d1d1d1',
    boxShadow: theme.shadow.default,
  },
  listItemRoot: {
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  projectButton: {
    '&:hover p, &:focus p': {
      opacity: 1,
    },
    borderRadius: '6px',
    color: '#9d9d9d',
    fontSize: theme.typography.pxToRem(16),
    minWidth: theme.spacing(5),
    textTransform: 'none',
    transition: theme.transitions.create(['background-color']),
    whiteSpace: 'nowrap',
  },
  projectButtonCurrent: {
    '&:hover': {
      backgroundColor: theme.palette.pause.light,
    },
    backgroundColor: '#f8f4ea',
    color: theme.palette.pause.dark,
  },
  projectButtonPaused: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    backgroundColor: '#fcfcfc',
  },
  projectText: {
    // opacity: 0.2,
  },
  startBtnDivider: {
    borderLeft: '1px dashed #eecf6d',
    height: theme.spacing(4.5),
    margin: theme.spacing(0, 2, 0, 1),
    width: 0,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 1, 0, 0),
    },
  },
  taskIcon: {
    left: 8,
    position: 'absolute',
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  userWorkTable: {
    zIndex: 1202,
  },
  verticalDivider: {
    borderLeft: '1px dashed #eecf6d',
    height: theme.spacing(4.5),
    margin: theme.spacing(0, 1),
    width: 0,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
}));
