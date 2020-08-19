import React from 'react';

import debounce from 'lodash/debounce';

import { withTheme } from '@material-ui/core/styles';

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

export const withResize = <P = any>(
  Component: React.FC<P> | React.ComponentClass<P>,
  getNode: (el: any) => any | boolean = (el: any) => el
): React.ComponentType<Omit<P, keyof IState>> => {
  return withTheme(
    class WithResize extends React.PureComponent<any, IState> {
      private handleResize = debounce(() => this.setState(this.getDimensions()), 200);

      constructor(props: P) {
        super(props);
        this.state = {
          ...this.getDimensions(),
          getRef: React.createRef(),
        };
      }

      componentDidMount(): void {
        if (typeof window !== 'undefined') {
          window.addEventListener('resize', this.handleResize, false);
          this.setState(this.getDimensions());
        }
      }

      componentWillUnmount(): void {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', this.handleResize);
        }
      }

      render() {
        const { theme, ...restProps } = this.props;
        const componentProps: any = { ...restProps, ...this.state };
        return React.createElement(Component, componentProps);
      }

      private getDimensions = (): IDimensions => {
        let height;
        let width;
        let scrollHeight;
        let scrollWidth;

        // 1. если была передана ссылка на елемент - используем ее. В противном случае, используем window
        const element = this?.state?.getRef?.current;
        if (element) {
          let nodeEl = element;
          if (getNode) {
            nodeEl = getNode(element);
          }

          width = nodeEl.offsetWidth;
          height = nodeEl.offsetHeight;
          scrollHeight = nodeEl.clientHeight;
          scrollWidth = nodeEl.clientWidth;
        } else {
          if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            const w = window;
            const d = document;
            const e = d.documentElement;
            const g = d.getElementsByTagName('body')[0];
            width = w.innerWidth || (e && e.clientWidth) || g.clientWidth;
            height = w.innerHeight || (e && e.clientHeight) || g.clientHeight;
            scrollHeight = (e && e.clientHeight) || g.clientHeight;
            scrollWidth = (e && e.clientWidth) || g.clientWidth;
          }
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
