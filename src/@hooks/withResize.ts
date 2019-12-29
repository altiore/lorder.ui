import { WithTheme, withTheme } from '@material-ui/core/styles';
import debounce from 'lodash/debounce';
import React from 'react';

export interface IDimensions {
  height: number;
  isWidthLg: boolean;
  isWidthMd: boolean;
  isWidthSm: boolean;
  scrollHeight: number;
  scrollWidth: number;
  width: number;
}

export interface IState extends IDimensions {
  getRef: React.RefObject<any>;
}

export const withResize = <P>(
  Component: React.FunctionComponent<P> | React.ComponentClass<P>,
  getNode: (el: any) => any | boolean = (el: any) => el
): any => {
  return withTheme(
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
        this.setState(this.getDimensions());
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
        let scrollHeight;
        let scrollWidth;
        if (this.state) {
          const { getRef } = this.state;
          if (getRef && getRef.current) {
            let element = getRef.current;
            if (getNode) {
              element = getNode(element);
            }

            width = element.offsetWidth;
            height = element.offsetHeight;
            scrollHeight = element.clientHeight;
            scrollWidth = element.clientWidth;
          }
        }
        if (width === undefined) {
          const w = window;
          const d = document;
          const e = d.documentElement;
          const g = d.getElementsByTagName('body')[0];
          width = w.innerWidth || (e && e.clientWidth) || g.clientWidth;
          height = w.innerHeight || (e && e.clientHeight) || g.clientHeight;
          scrollHeight = (e && e.clientHeight) || g.clientHeight;
          scrollWidth = (e && e.clientWidth) || g.clientWidth;
        }
        const { theme } = this.props;
        return {
          height,
          isWidthLg: width <= theme.breakpoints.values.lg && width > theme.breakpoints.values.md,
          isWidthMd: width <= theme.breakpoints.values.md && width > theme.breakpoints.values.sm,
          isWidthSm: width <= theme.breakpoints.values.sm,
          scrollHeight,
          scrollWidth,
          width,
        };
      };
    }
  );
};
