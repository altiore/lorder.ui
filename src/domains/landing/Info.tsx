import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { TelegramIco } from 'src/components/@icons/Telegram';
import { Block } from 'src/components/Block';
import { MemberCard } from 'src/components/MemberCard';
import { LinkButton } from 'src/domains/@common/LinkButton';
import { BackGroundImage } from './BackGroundImage';
// import { BackGroundVideo } from './BackGroundVideo';
import { Title } from './Title';
// import { YouTubeVideo } from './YouTubeVideo';

export interface IInfoProps {
  brandName: string;
  classes: any;
  texts: {
    btnText1: string;
    btnText2: string;
    btnText3: string;
    ourTeam: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
  };
  team: Array<{
    avatar: string;
    name: string;
  }>;
  tours: Array<{
    duration: number;
    image: string;
    stars: number;
    reviews: number;
    title: string;
  }>;
  height: number;
  width: number;
}

export interface IInfoState {
  cloudy: boolean;
}

export class InfoTsx extends React.Component<IInfoProps, IInfoState> {
  state = {
    cloudy: true,
  };

  render() {
    const { brandName, classes, team, texts, height, width } = this.props;
    const { btnText1, btnText2, btnText3, ourTeam, text1, text2, text3, text4 } = texts;
    const { cloudy } = this.state;
    return (
      <div className={classes.root}>
        <BackGroundImage height={height} width={width} />
        <div className={classes.clouds} style={{ opacity: Number(cloudy) }} />

        <AppBar key={'top'} position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {brandName}
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.overlay} style={{ height: height - 64, width: width - 15 }}>
          <Title title={text1} btnText={btnText1} onOver={this.handleMouseOver} onLeave={this.handleMouseLeave} />
        </div>

        <Grid container className={classes.content}>
          <Block>
            <Grid item className={classes.profile}>
              <Typography variant={'h4'}>{text2}</Typography>
              <LinkButton variant={'contained'} color={'primary'} className={classes.button} to={'/login'}>
                {btnText2}
              </LinkButton>
            </Grid>
          </Block>
          <Divider />
        </Grid>

        <Grid container className={classes.content}>
          <Block>
            <Grid item className={classes.profile}>
              <Typography variant={'h4'}>{text3}</Typography>
              <LinkButton variant={'contained'} color={'primary'} className={classes.button} to={'/login'}>
                {btnText3}
              </LinkButton>
            </Grid>
          </Block>

          <Divider />
          <Block>
            <Grid item className={classes.profile} xs={12}>
              <Typography variant={'h4'}>{ourTeam}</Typography>
              <Typography>{text4}</Typography>
            </Grid>
            {team.map((member, index) => (
              <Grid item key={index}>
                <MemberCard {...member} />
              </Grid>
            ))}
          </Block>
        </Grid>

        <AppBar key={'bottom'} position="static" component={'footer'}>
          <Toolbar className={classes.bottomBar}>
            <Typography variant="h6" color="inherit">
              Copyright &copy; {brandName}
            </Typography>
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" href={'https://t.me/joinchat/BmXj_kK5vnoAWdQF7tTc1g'} target={'_blank'}>
                <TelegramIco />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  private handleMouseOver = () => {
    this.setState({ cloudy: false });
  };

  private handleMouseLeave = () => {
    this.setState({ cloudy: true });
  };
}
