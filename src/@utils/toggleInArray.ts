export const toggleInArray = (state: any[], element: any) => {
  const index = state.indexOf(element);
  if (~index) {
    return [...state.slice(0, index), ...state.slice(index + 1)];
  } else {
    return [...state, element];
  }
};
