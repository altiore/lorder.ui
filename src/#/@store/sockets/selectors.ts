import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { ISockets, IState } from '@types';

const baseState = (state: IState): ISockets => state.sockets;

export const socketsInit = createDeepEqualSelector(baseState, (state: ISockets): boolean => Boolean(state.init));

export const socketMessages = createDeepEqualSelector(baseState, (state: ISockets): string[] => state.messages);
