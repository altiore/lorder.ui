import { CARD_COLOR } from '../../@components/project-card';
import getRandEnum from '../get-rand-enum';

describe('getRandEnum', () => {
  it('getRandEnum from CARD_COLOR', () => {
    expect(Object.values(CARD_COLOR).includes(getRandEnum(CARD_COLOR))).toBeTruthy();
  });
});
