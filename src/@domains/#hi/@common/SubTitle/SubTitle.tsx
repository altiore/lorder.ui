import cn from 'classnames';
import React from 'react';

import BlockContent from '@domains/#hi/@common/BlockContent';
import { useStyles } from './styles';

interface SubTitleI {
  black?: boolean;
  children: any;
  className?: string;
}

const SubTitle: React.FC<SubTitleI> = ({ black, children, className }) => {
  const classes = useStyles();

  return (
    <BlockContent black={black} className={cn(classes.subTitle, className)}>
      {children}
    </BlockContent>
  );
};

export default SubTitle;
