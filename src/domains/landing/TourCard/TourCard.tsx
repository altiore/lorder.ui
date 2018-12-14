import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { Stars } from './Stars';

export interface ITourCardProps {
  classes?: any;
  duration?: number;
  image: string;
  stars: number;
  title: string;
  reviews: number;
}

export const TourCardTsx: React.FunctionComponent<ITourCardProps> = ({
  classes,
  duration,
  image,
  reviews,
  stars,
  title,
}) => (
  <Card className={classes.card}>
    <CardActionArea>
      <CardMedia component="img" className={classes.media} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {title} ({duration} hours)
        </Typography>
        <Typography component="p">
          <Stars stars={stars} /> ({reviews} reviews)
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
