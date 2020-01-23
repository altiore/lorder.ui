import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import { useStyles } from './styles';

interface ItemI {
  description: string;
  icon: any;
  index: number;
  title: string;
}

const HoveredItem: React.FC<ItemI> = ({ description, icon, index, title }) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <VisibilitySensor onChange={setIsVisible} partialVisibility>
      <Grow in={isVisible} timeout={1500 + index * 500}>
        <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
          <Card className={classes.item}>
            <CardHeader avatar={<Avatar className={classes.icon}>{icon}</Avatar>} title={title} />
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grow>
    </VisibilitySensor>
  );
};

export default HoveredItem;
