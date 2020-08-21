import React from 'react';
import Slider from 'react-slick';
import { Settings } from 'react-slick';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { FlippingCard } from '@components/flipping-card/flipping-card';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Arrow from './arrow';

import { IMember } from '@types';

const getSliderSettings = (slidesLen: number = 0): Partial<Settings> => ({
  arrows: slidesLen > 1,
  infinite: slidesLen > 4,
  nextArrow: <Arrow type="next" />,
  prevArrow: <Arrow type="prev" />,
  responsive: [
    {
      breakpoint: 1260,
      settings: {
        slidesToScroll: 3,
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 980,
      settings: {
        slidesToScroll: 2,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    },
  ],
  slidesToScroll: 4,
  slidesToShow: 4,
});

export const PublicProjectSlider: React.FC<{ members: IMember[] }> = ({ members }) => {
  const { slideWrap } = useStyles();
  return (
    <Slider {...getSliderSettings(members.length)}>
      {members.map(({ member: { id, avatar, displayName }, memberRole, opinion }) => (
        <div key={id} className={slideWrap}>
          <FlippingCard
            avatarUrl={avatar?.url || process.env.PUBLIC_URL + '/d-avatar.png'}
            userName={displayName || 'N/A'}
            userRole={memberRole}
            userProfileLink="/"
            profileLinkTitle="Ссылка на профиль"
          >
            {opinion || '[пользователь НЕ высказался о проекте]'}
          </FlippingCard>
        </div>
      ))}
    </Slider>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  slideWrap: {
    outline: 'none',
    padding: theme.spacing(1, 1, 2),
  },
}));
