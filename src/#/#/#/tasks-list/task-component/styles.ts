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
    '&:hover': {
      '& $buttonTitleLabel:after': {
        backgroundColor: '#F5F5F5',
        color: theme.palette.pause.dark,
        height: theme.taskCard.outerHeight,
      },
      '& $buttonTitleSetting': {
        opacity: 1,
      },
      '& $sequenceNumber': {
        opacity: 1,
      },
      backgroundColor: 'transparent',
    },
    borderRadius: '6px',
    color: theme.palette.pause.main,
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(16),
    height: theme.taskCard.outerHeight,
    padding: 0,
  },
  buttonTitleCurrent: {
    '& $buttonTitleLabel': {
      color: theme.palette.pause.dark,
    },
    '&:hover': {
      ' $projectButtonCurrent': {
        backgroundColor: 'red',
        border: '2px solid red',
        color: 'red',
        height: theme.taskCard.outerHeight,
        zIndex: 0,
      },
      '& $buttonTitleLabel:after': {
        backgroundColor: theme.palette.pause.light,
        height: theme.taskCard.outerHeight,
        zIndex: 0,
      },
    },
  },
  buttonTitleLabel: {
    '& > span': {
      '-webkit-line-clamp': 2,
      boxOrient: 'vertical',
      display: 'block',
      fontWeight: 400,
      lineHeight: 1.4,
      maxHeight: theme.taskCard.outerHeight,
      overflow: 'hidden',
      paddingTop: 2,
      textOverflow: 'ellipsis',
      zIndex: 1,
      [theme.breakpoints.down('sm')]: {
        paddingRight: 25,
      },
    },
    '&:after': {
      backgroundColor: 'transparent',
      borderRadius: 6,
      content: "''",
      height: theme.taskCard.innerHeight,
      left: '0',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      transition: theme.transitions.create(['background-color', 'height']),
      width: '100%',
    },
    alignItems: 'center',
    borderRadius: 6,
    color: theme.palette.pause.main,
    display: 'flex',
    height: theme.taskCard.outerHeight,
    justifyContent: 'flex-start',
    minHeight: theme.taskCard.innerHeight,
    padding: theme.spacing(0.5, 3, 0.5, 5),
    transition: theme.transitions.create(['background-color', 'color', 'height', 'min-height']),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5, 0),
    },
  },
  buttonTitlePaused: {
    '& $buttonTitleLabel': {
      color: theme.palette.pause.main,
    },
    '&:hover': {
      backgroundColor: '#EAEBED',
    },
  },
  buttonTitleSetting: {
    color: '#f6d475',
    opacity: 0,
    position: 'absolute',
    right: 4,
    top: 4,
    transition: theme.transitions.create(['opacity']),
    zIndex: 1,
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
  },
  listItem: {
    '&:hover': {
      '& $projectText': {
        backgroundColor: 'transparent',
      },
      '& $projectText:after': {
        backgroundColor: 'transparent',
      },
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
    padding: theme.spacing(1, 1.5, 1, 0.75),
    position: 'relative',
    transition: theme.transitions.create(['background-color', 'border-color', 'box-shadow']),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1, 0.75, 1, 1),
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
    '&:hover, &:focus': {
      '& $projectText:after': {
        backgroundColor: '#F5F5F5',
        color: theme.palette.pause.dark,
        height: theme.taskCard.outerHeight,
        width: theme.taskCard.outerHeight + 4,
      },
      backgroundColor: 'transparent',
    },
    borderRadius: '6px',
    flexShrink: 0,
    height: theme.taskCard.outerHeight,
    marginRight: theme.spacing(-1),
    minWidth: theme.taskCard.outerHeight + 4,
    padding: 0,
    width: theme.taskCard.outerHeight + 4,
  },
  projectButtonCurrent: {
    '& $projectText': {
      backgroundColor: '#F8F4E4',
      color: theme.palette.pause.dark,
    },
    '& $projectText:after': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      '& $projectText:after': {
        backgroundColor: theme.palette.pause.light,
      },
    },
  },
  projectButtonPaused: {
    '&:hover': {
      backgroundColor: '#EAEBED',
    },
  },
  projectText: {
    '&:after': {
      backgroundColor: '#FCFCFC',
      borderRadius: 6,
      content: "''",
      height: theme.taskCard.innerHeight,
      left: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      transition: theme.transitions.create(['background-color', 'height', 'width']),
      width: theme.taskCard.innerHeight + 4,
    },
    alignItems: 'center',
    borderRadius: '6px',
    color: '#9d9d9d',
    display: 'flex',
    fontSize: theme.typography.pxToRem(16),
    height: theme.taskCard.innerHeight,
    justifyContent: 'center',
    position: 'relative',
    textTransform: 'none',
    transition: theme.transitions.create(['background-color', 'color', 'height', 'width'], { duration: '0.3s' }),
    whiteSpace: 'nowrap',
    width: theme.taskCard.innerHeight + 4,
  },
  sequenceNumber: {
    alignItems: 'center',
    borderRadius: 6,
    bottom: 2,
    color: '#9d9d9d',
    display: 'flex',
    fontSize: theme.typography.pxToRem(11),
    fontWeight: 500,
    justifyContent: 'center',
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: -3,
    transition: theme.transitions.create(['opacity']),
    width: theme.spacing(5),
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      opacity: 1,
    },
  },
  startBtnDivider: {
    borderLeft: '1px dashed #eecf6d',
    height: theme.taskCard.innerHeight,
    margin: theme.spacing(0, 1 + theme.taskCard.padding, 0, theme.taskCard.padding),
    width: 0,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  taskIcon: {
    left: 10,
    position: 'absolute',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      marginRight: 15,
      position: 'relative',
    },
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
    height: theme.taskCard.innerHeight,
    margin: theme.spacing(0, theme.taskCard.padding),
    width: 0,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
}));
