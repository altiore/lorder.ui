import get from 'lodash/get';

function parseErrors(errors: any) {
  return errors.reduce((acc: any, error: any) => {
    const { constraints, children } = error;
    acc[error.property] = constraints
      ? Object.keys(constraints)
        .map(key => constraints[key].substring(constraints[key].indexOf(' ') + 1))
        .join(', ')
      : parseErrors(children);
    return acc;
  }, {});
}

export const parseFormErrorsFromResponse = (response: any) => {
  const errors = get(response, 'error.response.data.errors');
  if (errors) {
    return parseErrors(errors);
  } else {
    return {
      _error: 'Неизвестная ошибка',
    }
  }
};