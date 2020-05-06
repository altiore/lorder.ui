import { createAction } from 'aglos';

interface CurState {
  counter: number;
}

export const addCounter = createAction<CurState>(() => async (setState, api) => {
  setState(({ counter }) => ({ counter: counter + 1 }));
  setState({ counter: 789 });
});
