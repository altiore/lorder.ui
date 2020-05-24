import { parseErrors } from './parseFormErrorsFromResponse';

const rawData = {
  errors: [
    {
      constraints: { isExists: 'Пользователь с таким email-ом уже существует' },
      property: 'email',
      value: 'razvanlomov@gmail.com',
    },
  ],
  message: 'Validation Error',
  statusCode: 422,
};

describe('parseFormErrorsFromResponse.spec', () => {
  it('parseErrors', () => {
    expect(parseErrors(rawData.errors)).toEqual({
      email: 'Пользователь с таким email-ом уже существует',
    });
  });
});
