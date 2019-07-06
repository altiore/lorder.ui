import getMailClientLinkByEmail from '../getMailClientLinkByEmail';

describe('getMailClientLinkByEmail', () => {
  it('tesxt', () => {
    expect(getMailClientLinkByEmail('razvanlomov@gmail.com')).toBe('https://mail.google.com/mail/?tab=rm&authuser=0');
  });
});
