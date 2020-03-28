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
    MuiTextField: {
      variant: 'outlined',
    },
  },
  textGradient: [
    {
      '-webkit-background-clip': 'text',
      background: `linear-gradient(60deg,
     ${SECONDARY_DARKEN} 0%,
      ${secondary.dark} 10%,
      ${secondary.dark} 40%,
       ${secondary.light} 55%,
        ${secondary.dark} 70%,
         ${secondary.dark} 100%
         )`,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  ],
  typography: {
    body1: {
      fontSize: defaultTheme.typography.pxToRem(14),
    },
    body2: {
      fontSize: defaultTheme.typography.pxToRem(13),
    },
    button: {
      textTransform: 'none',
    },
    caption: {
      fontSize: defaultTheme.typography.pxToRem(34),
    },
    h1: {
      fontSize: defaultTheme.typography.pxToRem(26),
    },
    h2: {
      fontSize: defaultTheme.typography.pxToRem(22),
    },
    h3: {
      fontSize: defaultTheme.typography.pxToRem(20),
    },
    h4: {
      fontSize: defaultTheme.typography.pxToRem(17),
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
      fontSize: defaultTheme.typography.pxToRem(11),
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
