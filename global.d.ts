declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss';
declare module '*.mp4';

declare module 'redux-axios-middleware' {
  export const multiClientMiddleware: any;
}

declare module 'uniqid' {
  export default function(prefix?: string): string;
}

declare module 'highcharts' {
  // export default : any;
}

// import * as React from 'react';
declare module 'react-jsx-highcharts' {
  export const Highcharts: any;

  export const Chart: any;
  export const ColumnSeries: any;
  export const HighchartsChart: any;
  export const Legend: any;
  export const PieSeries: any;
  export const PlotOptions: any;
  export const SplineSeries: any;
  export const Title: any;
  export const Tooltip: any;
  export const withHighcharts: any;
  export const XAxis: any;
  export const YAxis: any;
  //
  //
  //   // export class Chart extends React.Component<any> { render(): JSX.Element | null;}
  //   // export class ColumnSeries extends React.Component<any> { render(): JSX.Element | null;}
  //   // export class HighchartsChart extends React.Component<any> { render(): JSX.Element | null;}
  //   // export class Legend extends React.Component<any> { render(): JSX.Element | null;}
  //   // export class PieSeries extends React.Component<any> { render(): JSX.Element | null;}
  //   // export class SplineSeries extends React.Component<any> { render(): JSX.Element | null;}
  //   // export class Title extends React.Component<any> { render(): JSX.Element | null;}
  //   // export const withHighcharts: any;
  //   // export class XAxis extends React.Component<any> { render(): JSX.Element | null;}
  //   // export class YAxis extends React.Component<any> { render(): JSX.Element | null;}
}
