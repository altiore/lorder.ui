import React from 'react';

import CenterDecorator from '../../../.storybook/decor/Center';
import RouterDecorator from '../../../.storybook/decor/RouterDecorator';
import StoreDecorator from '../../../.storybook/decor/StoreDecorator';
import { FlippingCard } from './FlippingCard';

import { storiesOf } from '@storybook/react';

storiesOf('FlippingCard', module)
  .addDecorator(CenterDecorator)
  .addDecorator(StoreDecorator)
  .addDecorator(RouterDecorator)
  .add('default', () => {
    return (
      <FlippingCard
        avatarUrl="https://altiore.storage.googleapis.com/5949af8ec1096e89f44108c41a767436510.jpg"
        userName="Разван Ломов"
        userRole="Архитектор"
        userProfileLink="/"
        profileLinkTitle="Ссылка на профиль"
      >
        Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum
        используют потому, что тот обеспечивает стандартное заполнение шаблона Давно выяснено, что при оценке дизайна и
        композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает
        стандартное заполнение шаблона
      </FlippingCard>
    );
  });
