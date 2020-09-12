import { useTheme } from '@material-ui/core/styles';

import useResize, { IDimensions } from './use-resize';

interface ISizeFlags {
  isWidthLg: boolean;
  isWidthMd: boolean;
  isWidthSm: boolean;
}

const useResizeTheme = (nodeEl?: any): IDimensions & ISizeFlags => {
  const { width, ...restDimensions } = useResize(nodeEl);
  const theme = useTheme();

  return {
    isWidthLg: width <= theme.breakpoints.values.lg && width > theme.breakpoints.values.md,
    isWidthMd: width <= theme.breakpoints.values.md && width > theme.breakpoints.values.sm,
    isWidthSm: width <= theme.breakpoints.values.sm,
    ...restDimensions,
    width,
  };
};

export default useResizeTheme;
