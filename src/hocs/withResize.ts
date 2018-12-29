import debounce from 'lodash-es/debounce';
import * as React from 'react';

export interface IState {
  height: number;
  width: number;
  getRef: React.RefObject<any>;
}

export const withResize = <P = {}>(
  Component: React.FunctionComponent<P> | React.ComponentClass<P>,
  getNode?: (el: any) => any
): React.FunctionComponent<P> | React.ComponentClass<P> =>
  class WithResize extends React.Component<P, IState> {
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
      return React.createElement(Component as any, { ...restProps, ...this.state }, children);
    }

    private getDimensions = (): { height: number; width: number } => {
      if (this.state) {
        const { getRef } = this.state;
        if (getRef && getRef.current) {
          let element = getRef.current;
          if (getNode) {
            element = getNode(element);
          }

          return {
            height: element.offsetHeight,
            width: element.offsetWidth,
          };
        }
      }
      const w = window;
      const d = document;
      const e = d.documentElement;
      const g = d.getElementsByTagName('body')[0];
      const width = w.innerWidth || (e && e.clientWidth) || g.clientWidth;
      const height = w.innerHeight || (e && e.clientHeight) || g.clientHeight;
      return {
        height,
        width,
      };
    };
  };
