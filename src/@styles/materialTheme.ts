import {createMuiTheme, darken, lighten, Theme} from '@material-ui/core/styles';

const defaultTheme: Theme = createMuiTheme({});

const BACKGROUND_DEFAULT = '#EBEEF0';
const BACKGROUND_DARK = '#242426';

const SECONDARY_DARK = '#FFB200';
const SECONDARY_DARKEN = darken(SECONDARY_DARK, .8);
const SECONDARY_MAIN = '#FFF0B5';
const SECONDARY_LIGHT = lighten(SECONDARY_MAIN, .2);

const prettyScroll1 = {
  '&::-webkit-scrollbar': {
    width: defaultTheme.spacing(),
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#404448',
    borderRadius: defaultTheme.spacing(0.5),
    cursor: 'pointer',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#24292E',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#CED4D9',
    borderRadius: defaultTheme.spacing(0.5),
  },
};

export default createMuiTheme({
  mainContent: {
    scroll: prettyScroll1,
    width: 1012,
  },
  textGradient: [
    {
      background: `linear-gradient(60deg,
     ${SECONDARY_DARKEN} 0%,
      ${SECONDARY_DARK} 10%,
      ${SECONDARY_DARK} 40%,
       ${SECONDARY_LIGHT} 55%,
        ${SECONDARY_DARK} 70%,
         ${SECONDARY_DARK} 100%
         )`,
      backgroundClip: "text",
      "-webkit-background-clip": "text",
      textFillColor: "transparent",
    },
  ],
  overrides: {
    MuiDialogActions: {
      root: {
        [defaultTheme.breakpoints.down('sm')]: {
          bottom: 0,
          margin: 0,
          padding: '4px',
          position: 'fixed',
          width: 'calc(100% - 8px)',
          zIndex: 100,
        },
      },
    },
    MuiDialogContent: {
      root: prettyScroll1,
    },
    MuiDialogTitle: {
      root: {
        alignItems: 'center',
        // backgroundColor: '#24292E',
        borderRadius: defaultTheme.spacing(0.5),
        display: 'flex',
        flexFlow: 'row nowrap',
        height: 60,
        justifyContent: 'space-between',
        padding: `0 ${defaultTheme.spacing(1)}px`,
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: '0 16px 16px',
      },
    },
    MuiFormHelperText: {
      root: {
        backgroundColor: "transparent",
        bottom: -13,
        position: "absolute",
      },
    },
    MuiInputAdornment: {
      positionStart: {
        position: "absolute",
        left: defaultTheme.spacing(1.25),
        zIndex: 1,
      },
      root: {
        color: "#878787",
      },
    },
    MuiInputBase: {
      input: {
        borderRadius: 4,
      },
    },
    MuiOutlinedInput: {
      adornedStart: {
        paddingLeft: 0,
      },
      inputAdornedStart: {
        paddingLeft: defaultTheme.spacing(4.25),
      },
      input: {
        fontSize: defaultTheme.typography.pxToRem(14),
        height: defaultTheme.typography.pxToRem(36),
        minWidth: defaultTheme.spacing(20),
        padding: 0,
        position: "absolute",
        width: `calc(100% - ${defaultTheme.spacing(4.25)}px)`
      },
      notchedOutline: {
        zIndex: 1,
      },
      root: {
        backgroundColor: defaultTheme.palette.background.default,
        borderRadius: defaultTheme.shape.borderRadius,
        height: defaultTheme.typography.pxToRem(36),
      },
    },
    MuiTextField: {
      root: {
        marginBottom: defaultTheme.spacing(2),
        width: "100%"
      },
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: 6,
        paddingRight: 6,
      },
      root: {
        zIndex: defaultTheme.zIndex.drawer + 1,
        [defaultTheme.breakpoints.down('sm')]: {
          ...(defaultTheme.overrides as any).MuiAppBar,
          padding: 0,
        },
      },
    },
  },
  mixins: {
    toolbar: {
      height: 56,
    },
  },
  palette: {
    background: {
      default: BACKGROUND_DEFAULT,
      paper: "#fff",
    },
    primary: {
      contrastText: '#ffffff',
      dark: '#000000',
      light: '#404448',
      main: BACKGROUND_DARK,
    },
    secondary: {
      contrastText: '#24292E',
      dark: SECONDARY_DARK,
      light: SECONDARY_LIGHT,
      main: SECONDARY_MAIN,
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    h2: {
      fontSize: 14,
      fontWeight: 700,
    },
    h5: {
      fontSize: 18,
      fontWeight: 500,
    },
  },
});

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    mainContent: {
      scroll: object;
      width: number;
    };
    textGradient: object[];
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    mainContent?: {
      scroll?: object;
      width?: number;
    };
    textGradient?: object[];
  }
}
