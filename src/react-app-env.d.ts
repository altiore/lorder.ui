/// <reference types="react-scripts" />
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
  export const theme: any;
  export function setOptions(...args: any): any;
  export function getOptions(...args: any): any;
  export function map(...args: any): any;
  export function Color(...args: any): any;
  // export default : any;
}

// import * as React from 'react';
declare module 'react-jsx-highcharts' {
  export class Chart extends React.Component<any> {
    render(): JSX.Element | null;
  }
  export class ColumnSeries extends React.Component<any> {
    render(): JSX.Element | null;
  }
  export class HighchartsChart extends React.Component<any> {
    render(): JSX.Element | null;
  }
  export class Legend extends React.Component<any> {
    render(): JSX.Element | null;
  }
  export class PieSeries extends React.Component<any> {
    render(): JSX.Element | null;
  }
  export class SplineSeries extends React.Component<any> {
    render(): JSX.Element | null;
  }
  export class Title extends React.Component<any> {
    render(): JSX.Element | null;
  }
  export class Tooltip extends React.Component<any> {
    render(): JSX.Element | null;
  }
  export function withHighcharts(...args: any): any;
  export class XAxis extends React.Component<any> {
    render(): JSX.Element | null;
  }
  export class YAxis extends React.Component<any> {
    render(): JSX.Element | null;
  }
}

// import * as React from 'react';
declare module 'react-copy-to-clipboard' {
  export class CopyToClipboard extends React.Component<{
    text: string;
    onCopy?: (e?: React.SyntheticEvent | string) => any;
    children: React.ReactNode;
  }> {
    render(): JSX.Element | null;
  }
}
