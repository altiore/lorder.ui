import { createMuiTheme, Theme } from '@material-ui/core/styles';

import MuiDialog from './MuiDialog';
import MuiTextField from './MuiTextField';
import { background, /*error,*/ primary, secondary } from './palette';
import { prettyScroll1, SECONDARY_DARKEN } from './variables';

const defaultTheme: Theme = createMuiTheme({});

export default createMuiTheme({
  themeName: 'LIGHT',

  mainContent: {
    scroll: prettyScroll1,
    width: 1012,
  },
  mixins: {
    toolbar: {
      height: 56,
    },
  },
  overrides: {
    ...MuiDialog(defaultTheme),
    ...MuiTextField(defaultTheme),
    MuiExpansionPanelDetails: {
      root: {
        padding: '0 16px 16px',
      },
    },
    MuiIconButton: {
      root: {
        borderRadius: defaultTheme.shape.borderRadius,
        padding: defaultTheme.typography.pxToRem(7),
      },
    },
    MuiTab: {
      root: {
        '&:focus': {
          opacity: 1,
        },
        color: '#fff',
        fontSize: defaultTheme.typography.pxToRem(15),
        fontWeight: defaultTheme.typography.fontWeightRegular,
        marginRight: defaultTheme.spacing(1),
        textTransform: 'none',
      },
    },
    MuiTabs: {
      indicator: {
        '& > div': {
          backgroundColor: secondary.dark,
          maxWidth: 40,
          width: '100%',
        },
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
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
  palette: {
    background,
    primary,
    secondary,
  },
  props: {
    MuiSelect: {
      variant: 'outlined',
    },
    MuiTextField: {
      variant: 'outlined',
    },
  },
  textGradient: [
    {
      '-webkit-background-clip': 'text',
      background: `linear-gradient(45deg,
      ${SECONDARY_DARKEN} 35%,
       ${secondary.light} 50%,
        ${SECONDARY_DARKEN} 65%
         )`,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  ],
  typography: {
    body1: {
      fontSize: defaultTheme.typography.pxToRem(16),
    },
    body2: {
      fontSize: defaultTheme.typography.pxToRem(14),
    },
    button: {
      textTransform: 'none',
    },
    caption: {
      fontSize: defaultTheme.typography.pxToRem(12),
      lineHeight: defaultTheme.typography.pxToRem(12),
    },
    h1: {
      fontSize: defaultTheme.typography.pxToRem(55),
      fontWeight: 'bold',
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: defaultTheme.typography.pxToRem(34),
      },
    },
    h2: {
      fontSize: defaultTheme.typography.pxToRem(50),
      fontWeight: 'bold',
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: defaultTheme.typography.pxToRem(32),
      },
    },
    h3: {
      fontSize: defaultTheme.typography.pxToRem(30),
    },
    h4: {
      fontSize: defaultTheme.typography.pxToRem(24),
      fontWeight: 500,
    },
    h5: {
      fontSize: defaultTheme.typography.pxToRem(18),
      fontWeight: 500,
    },
    h6: {
      fontSize: defaultTheme.typography.pxToRem(13),
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: defaultTheme.typography.pxToRem(22),
      fontWeight: 200,
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: defaultTheme.typography.pxToRem(20),
      },
    },
    subtitle2: {
      fontSize: defaultTheme.typography.pxToRem(10),
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
    themeName?: string;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    mainContent?: {
      scroll?: object;
      width?: number;
    };
    textGradient?: object[];
    themeName?: string;
  }
}
