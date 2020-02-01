import { combineActions as reduxActionsCombine } from 'redux-actions';

import { ActionType } from '../requestActions';

export const combineActions: any = <Params = any>(...args: Array<ActionType<Params>>) => {
  if (args.length === 0) {
    throw new Error('Как минимум один параметр должен быть у функции combineActions');
  }
  const allArgs = args.reduce<string[]>((all, value: ActionType<Params> & any) => {
    if (value.success) {
      all.push(value.toString());
      all.push(value.success);
      all.push(value.fail);
    } else {
      all.push(value.toString());
    }
    return all;
  }, []);
  return reduxActionsCombine(...allArgs);
};
