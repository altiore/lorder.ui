import { WithTheme, withTheme } from '@material-ui/core/styles';
import debounce from 'lodash-es/debounce';
import * as React from 'react';

export interface IDimensions {
  height: number;
  isWidthLg: boolean;
  isWidthMd: boolean;
  isWidthSm: boolean;
  width: number;
}

export interface IState extends IDimensions {
  getRef: React.RefObject<any>;
}

export const withResize = <P>(
  Component: React.FunctionComponent<P> | React.ComponentClass<P>,
  getNode?: (el: any) => any | boolean
): any => {
  return withTheme()(
    class WithResize extends React.Component<WithTheme, IState> {
      private handleResize = debounce(() => this.setState(this.getDimensions()), 200);

      constructor(props: any) {
        super(props);
        this.state = {
          ...this.getDimensions(),
          getRef: React.createRef(),
        };
      }

      componentDidMount(): void {
        window.addEventListener('resize', this.handleResize, false);
      }

      componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleResize);
      }

      render() {
        const { children, ...restProps } = this.props as any;
        const { getRef, ...restState } = this.state;
        const componentProps: any = {
          ...restProps,
          ...restState,
        };
        if (getNode) {
          componentProps.getRef = getRef;
        }
        return React.createElement(Component as any, componentProps, children);
      }

      private getDimensions = (): IDimensions => {
        let height;
        let width;
        if (this.state) {
          const { getRef } = this.state;
          if (getRef && getRef.current) {
            let element = getRef.current;
            if (getNode) {
              element = getNode(element);
            }

            width = element.offsetWidth;
            height = element.offsetHeight;
          }
        }
        if (width === undefined) {
          const w = window;
          const d = document;
          const e = d.documentElement;
          const g = d.getElementsByTagName('body')[0];
          width = w.innerWidth || (e && e.clientWidth) || g.clientWidth;
          height = w.innerHeight || (e && e.clientHeight) || g.clientHeight;
        }
        const { theme } = this.props;
        return {
          height,
          isWidthLg: width <= theme.breakpoints.values.lg && width > theme.breakpoints.values.md,
          isWidthMd: width <= theme.breakpoints.values.md && width > theme.breakpoints.values.sm,
          isWidthSm: width <= theme.breakpoints.values.sm,
          width,
        };
      };
    }
  );
};
