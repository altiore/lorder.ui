import Star from '@material-ui/icons/Star';
import StarEmpty from '@material-ui/icons/StarBorder';
import StarHalf from '@material-ui/icons/StarHalf';
import * as React from 'react';

export interface IStarsProps {
  stars: number;
}

export const StarsTsx: React.StatelessComponent<IStarsProps> = ({ stars }) => {
  let arr: number[] = [0, 0, 0, 0, 0];
  if (stars >= 5) {
    arr = [1, 1, 1, 1, 1];
  } else if (stars > 4) {
    arr = [1, 1, 1, 1, 0.5];
  } else if (stars === 4) {
    arr = [1, 1, 1, 1, 0];
  } else if (stars > 3) {
    arr = [1, 1, 1, 0.5, 0, 0];
  } else if (stars === 3) {
    arr = [1, 1, 1, 0, 0];
  } else if (stars > 2) {
    arr = [1, 1, 0.5, 0, 0];
  } else if (stars === 2) {
    arr = [1, 1, 0, 0, 0];
  } else if (stars > 1) {
    arr = [1, 0.5, 0, 0, 0];
  } else if (stars === 1) {
    arr = [1, 0, 0, 0, 0];
  } else if (stars > 0) {
    arr = [0.5, 0, 0, 0, 0];
  }
  return (
    <span>
      {arr.map(
        (star, index) =>
          star ? (
            star === 0.5 ? (
              <StarHalf fontSize={'small'} key={index} />
            ) : (
              <Star fontSize={'small'} key={index} />
            )
          ) : (
            <StarEmpty fontSize={'small'} key={index} />
          )
      )}
    </span>
  );
};
