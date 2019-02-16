import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  ({
    details: {
      ...theme.mainContent.scroll,
      maxHeight: 444,
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: 0,
    },
    expanded: {
      ...theme.mainContent.scroll,
      maxHeight: 444,
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    heading: {
      flexBasis: '100%',
      flexShrink: 0,
      fontSize: theme.typography.pxToRem(15),
    },
    list: {
      width: '100%',
    },
    root: {
      width: '100%',
    },
  } as any);
