import getRandEnum from '../get-rand-enum';

import { PROJECT_COLOR } from '@types';

describe('getRandEnum', () => {
  it('getRandEnum from PROJECT_COLOR', () => {
    expect(Object.values(PROJECT_COLOR).includes(getRandEnum(PROJECT_COLOR))).toBeTruthy();
  });
});
