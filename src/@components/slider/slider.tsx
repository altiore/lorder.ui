import React from 'react';
import Slider from 'react-slick';
import { Settings } from 'react-slick';

import { makeStyles, Theme } from '@material-ui/core/styles';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Arrow from './arrow';

const getSliderSettings = (slidesLen: number = 0, override?: Partial<Settings>): Partial<Settings> => ({
  arrows: slidesLen > 1,
  dots: true,
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
  ...(override || {}),
});

interface IProps extends Partial<Settings> {
  children: any[];
}

export function CustomSlider({ children, ...rest }: IProps): JSX.Element {
  const { slideWrap } = useStyles();
  return (
    <Slider {...getSliderSettings(children.length, rest)}>
      {children.map((item, index) => (
        <div key={index} className={slideWrap}>
          {item}
        </div>
      ))}
    </Slider>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  slideWrap: {
    outline: 'none',
    padding: theme.spacing(1, 1, 2),
  },
}));
