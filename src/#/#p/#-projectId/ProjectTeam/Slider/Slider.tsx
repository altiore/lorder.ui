import React from 'react';
import Slider from 'react-slick';
import { CustomArrowProps, Settings } from 'react-slick';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { FlippingCard } from '@components/FlippingCard/FlippingCard';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { useStyles } from '../styles';

const getSliderSettings = (slidesLen: number = 0): Partial<Settings> => ({
  arrows: true,
  infinite: slidesLen > 4,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
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

const PrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.control} ${classes.leftControl}`} onClick={onClick}>
      <ChevronLeftIcon className={classes.arrow} />
    </div>
  );
};

const NextArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.control} ${classes.rightControl}`} onClick={onClick}>
      <ChevronRightIcon fontSize="large" className={classes.arrow} />
    </div>
  );
};

export const PublicProjectSlider: React.FC<{ members: any[] }> = ({ members }) => {
  const classes = useStyles();
  return (
    <Slider {...getSliderSettings(members.length)}>
      {members.map(({ id, avatar, displayName, role }, i) => (
        <div key={id} className={classes.slideWrap}>
          <FlippingCard
            avatarUrl={avatar?.url || process.env.PUBLIC_URL + '/d-avatar.png'}
            userName={displayName || 'N/A'}
            userRole={role}
            userProfileLink="/"
            profileLinkTitle="Ссылка на профиль"
          >
            Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum
            используют потому, что тот обеспечивает стандартное заполнение шаблона Давно выяснено, что при оценке
            дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот
            обеспечивает стандартное заполнение шаблона
          </FlippingCard>
        </div>
      ))}
    </Slider>
  );
};
