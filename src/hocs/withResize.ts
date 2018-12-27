import debounce from 'lodash-es/debounce';
import * as React from 'react';

export interface IState {
  height: number;
  width: number;
  ref: React.RefObject<any>;
}

export const withResize = <P = {}>(
  Component: React.FunctionComponent<P> | React.ComponentClass<P>,
  getNode?: (el: any) => any
) =>
  class InfoTsx extends React.Component<P, IState> {
    private handleResize = debounce(() => this.setState(this.getDimensions()), 200);

    constructor(props: any) {
      super(props);
      this.state = {
        ...this.getDimensions(),
        ref: React.createRef(),
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

    private getDimensions(): { height: number; width: number } {
      const { ref } = this.state;
      if (ref.current) {
        let element = ref.current;
        if (getNode) {
          element = getNode(element);
        }

        return {
          height: element.offsetHeight,
          width: element.offsetWidth,
        };
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
    }
  };
