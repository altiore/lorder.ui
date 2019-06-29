import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Screen3 from './Screen3';

const mapState = createStructuredSelector({
  texts: () => ({
    adv1: 'Быстрое и легкое управление таймером',
    adv2: 'Узнайте, как вы тратите время и контролируйте его расход',
    adv3: 'Следите за изменением прогресса вашей команды, интересных проектов',
    adv4: 'Распределяйте ресурсы справедливо между участниками проекта, используя алгоритмы искусственного интеллекта',
    adv5: 'Управляейте процессами вашего проекта играючи',
  }),
});

export default connect(mapState)(Screen3);
