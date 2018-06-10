import * as React from 'react';

export interface IProps {
  children: string|any,
}

export const ButtonJsx = ({ children }: IProps) => (
  <button styleName='main'>
    {children}
  </button>
);
