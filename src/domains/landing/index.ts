import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { withResize } from 'src/hocs/withResize';
import { team, tours } from './data';
import { InfoTsx } from './Info';
import { styles } from './styles';

const masStateToProps = () => ({
  brandName: 'Altiore',
  team,
  texts: {
    btnText1: 'Управлять временем',
    btnText2: 'Подчинить время',
    btnText3: 'Высвободить время',
    ourTeam: 'Наша команда',
    text1: 'Ты управляешь своим временем?',
    text2: '... или время управляет тобой?',
    text3: 'Пока ты думаешь, время уходит... безвозвратно...',
    text4: 'В безумном мире хаоса и ежедневно меняющихся технологий кто поможет тебе навести порядок?',
  },
  tours,
});

export const Info = connect(masStateToProps)(withStyles(styles, { withTheme: true })(withResize(InfoTsx)) as any);
