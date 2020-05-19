import get from 'lodash/get';

export const removeFromList = (listName: string, idName: string = 'id') => (state, { payload, meta }) => {
  const list = state[listName];
  const removedId = get(
    payload,
    ['data', idName],
    parseInt(get(get(meta, ['previousAction', 'payload', 'request', 'url'], '').match(/[^/]+$/), 0, 0), 0)
  );
  const index = list.findIndex(el => el[idName] === removedId);
  if (index !== -1) {
    return {
      ...state,
      [listName]: [...list.slice(0, index), ...list.slice(index + 1)],
    };
  }

  console.error('Удаляемый объект не был найден в списке!', { removedId, payload, meta });
  return state;
};
