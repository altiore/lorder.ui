import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import ScreenServices from './ScreenServices';

const mapState = createStructuredSelector({
  texts: () => [
    'Учитывать затраченное время',
    'Исследовать, на что идет главный ресурс - время',
    'Создавать социальные и личные проекты',
    'Управлять процессами в проекте',
    'Справедливо распределять ценность среди участников',
    'Находить интересные проекты и присоединяться к ним',
    'Отслеживать изменения в популярных социальных проектах',
  ],
});

export default connect(mapState)(ScreenServices);
