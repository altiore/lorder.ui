import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { useStyles } from "./styles";

interface ItemI {
  description: string;
  icon: any;
  title: string;
}

const HoveredItem: React.FC<ItemI> = ({ description, icon, title }) => {
  const classes = useStyles();

  return (
    <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
      <Card className={classes.item}>
        <CardHeader
          avatar={(
            <Avatar className={classes.icon}>
              {icon}
            </Avatar>
          )}
          title={title}
        />
        <CardContent>
          <Typography>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HoveredItem;