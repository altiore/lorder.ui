import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

export interface IMemberCardProps {
  classes?: any;
  image: string;
  name: string;
}

export const MemberCardTsx: React.StatelessComponent<IMemberCardProps> = ({ classes, image, name }) => (
  <Card className={classes.card}>
    <CardActionArea>
      <CardMedia component="img" className={classes.media} image={image} title={name} />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
