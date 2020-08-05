import React from 'react';

import { shallow } from 'enzyme';

import { FlippingCard } from './flipping-card';

describe('FlippingCard', () => {
  it('test base render', () => {
    const component = shallow(
      <FlippingCard
        userName="User Name"
        userRole="Архитектор"
        userProfileLink="https://profile.link"
        avatarUrl="https://avatar.url"
        profileLinkTitle="likn title"
      >
        text
      </FlippingCard>
    );

    expect(
      component.find('img').filterWhere(item => {
        return item.prop('src') === 'https://avatar.url';
      })
    ).toHaveLength(1);
  });
});
