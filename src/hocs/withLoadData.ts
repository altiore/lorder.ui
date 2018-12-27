import * as React from 'react';
import { connect } from 'react-redux';

export const withLoadData = <P = {}>(
  WrappedComponent: React.FunctionComponent<P> | React.ComponentClass<P>,
  loadData: (...args: any) => any
) => {
  const mapDispatchToProps = {
    loadData,
  };
  return connect(
    undefined,
    mapDispatchToProps
  )(
    class extends React.Component<{ loadData: (...args: any) => any }> {
      componentDidMount() {
        if (!this.props.loadData) {
          throw new Error('loadData function is required!');
        }
        this.props.loadData();
      }

      render() {
        const { children, ...restProps } = this.props as any;
        return React.createElement(WrappedComponent as any, { ...restProps }, children);
      }
    }
  );
};
