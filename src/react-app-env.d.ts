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

// import React from 'react';
declare module 'react-copy-to-clipboard' {
  export class CopyToClipboard extends React.Component<{
    text: string;
    onCopy?: (link: string) => any;
    children: React.ReactNode;
  }> {
    render(): JSX.Element | null;
  }
}
