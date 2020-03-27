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
    button: {
      textTransform: 'none',
    },
    h2: {
      fontSize: defaultTheme.typography.pxToRem(14),
      fontWeight: 700,
    },
    h5: {
      fontSize: defaultTheme.typography.pxToRem(18),
      fontWeight: 500,
    },
  },
});

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    themeName?: string;
    mainContent: {
      scroll: object;
      width: number;
    };
    textGradient: object[];
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    themeName?: string;
    mainContent?: {
      scroll?: object;
      width?: number;
    };
    textGradient?: object[];
  }
}
