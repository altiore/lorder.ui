declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss';

declare module 'redux-axios-middleware' {
  export const multiClientMiddleware: any;
}

declare module 'uniqid' {
  export default function(prefix?: string): string;
}
