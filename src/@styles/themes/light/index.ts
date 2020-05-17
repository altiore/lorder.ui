import { createMuiTheme, Theme } from '@material-ui/core/styles';

import MuiDialog from './MuiDialog';
import MuiTextField from './MuiTextField';
import { defaultTheme as theme, palette } from './palette';
import { prettyScroll1, SECONDARY_DARKEN } from './variables';

const SHADOW_DEFAULT = '0 2px 10px #d8d8d8';
const SHADOW_SECONDARY = '0 4px 10px rgba(242, 213, 120, 0.5)';

export default createMuiTheme({
  themeName: 'LIGHT',

  gradient: ['linear-gradient(45deg, #29292b 0%, #424247 50%, #29292b 100%)'],
  mainContent: {
    scroll: prettyScroll1,
    width: 1280,
  },
  mixins: {
    toolbar: {
      height: 56,
    },
  },
  overrides: {
    ...MuiDialog(theme),
    ...MuiTextField(theme),
    MuiAppBar: {
      colorDefault: {
        backgroundColor: palette.default.main,
      },
    },
    MuiChip: {
      outlined: {
        '&:hover': {
          backgroundColor: `${palette.primary.main}!important`,
          borderColor: 'rgb(214, 186, 98)',
          boxShadow: SHADOW_SECONDARY,
          color: palette.common.white,
        },
        border: '1px solid rgba(0, 0, 0, 0.1)',
        color: palette.default.light,
        fontSize: theme.typography.pxToRem(14),
        fontWeight: 400,
      },
    },
    MuiExpansionPanel: {
      rounded: {
        '&:first-child': {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
        '&:last-child': {
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        },
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: '0 16px 16px',
      },
    },
    MuiExpansionPanelSummary: {
      content: {
        '&$expanded': {
          margin: theme.spacing(1, 0),
        },
      },
      root: {
        '&$expanded': {
          borderBottom: `2px solid ${palette.secondary.light}`,
          minHeight: theme.spacing(7.5) - 2,
        },
      },
    },
    MuiFab: {
      sizeMedium: {
        height: '44px',
        width: '44px',
      },
    },
    MuiIconButton: {
      root: {
        borderRadius: theme.shape.borderRadius,
        padding: theme.typography.pxToRem(7),
      },
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: 6,
        paddingRight: 6,
      },
      root: {
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.down('sm')]: {
          ...(theme.overrides as any).MuiAppBar,
          padding: 0,
        },
      },
    },
  },
  palette,
  props: {
    MuiSelect: {
      variant: 'outlined',
    },
    MuiTextField: {
      variant: 'outlined',
    },
  },
  shadow: {
    default: SHADOW_DEFAULT,
    secondary: SHADOW_SECONDARY,
  },
  shape: {
    borderRadius: 4,
    borderRadius2: 8,
  },
  textGradient: [
    {
      '-webkit-background-clip': 'text',
      background: `linear-gradient(45deg,
      ${SECONDARY_DARKEN} 35%,
       ${palette.secondary.light} 50%,
        ${SECONDARY_DARKEN} 65%
         )`,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  ],
  typography: {
    body1: {
      fontSize: theme.typography.pxToRem(16),
    },
    body2: {
      fontSize: theme.typography.pxToRem(14),
    },
    button: {
      textTransform: 'none',
    },
    caption: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: theme.typography.pxToRem(12),
    },
    h1: {
      fontSize: theme.typography.pxToRem(55),
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(34),
      },
    },
    h2: {
      fontSize: theme.typography.pxToRem(50),
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(32),
      },
    },
    h3: {
      fontSize: theme.typography.pxToRem(30),
    },
    h4: {
      fontSize: theme.typography.pxToRem(24),
      fontWeight: 400,
    },
    h5: {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: 500,
    },
    h6: {
      fontSize: theme.typography.pxToRem(13),
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: theme.typography.pxToRem(22),
      fontWeight: 200,
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(20),
      },
    },
    subtitle2: {
      fontSize: theme.typography.pxToRem(10),
    },
  },
});

declare module '@material-ui/core/styles/shape' {
  interface Shape {
    borderRadius: number;
    borderRadius2: number;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    gradient: string[];
    mainContent: {
      scroll: object;
      width: number;
    };
    shadow: {
      default: string;
      secondary: string;
    };
    textGradient: object[];
    themeName?: string;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    gradient?: string[];
    mainContent?: {
      scroll?: object;
      width?: number;
    };
    shadow?: {
      default?: string;
      secondary?: string;
    };
    textGradient?: object[];
    themeName?: string;
  }
}
