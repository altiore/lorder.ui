import { connect } from 'react-redux';

import { refreshAll } from '#/@store/tasksFilter';

import { NoMatchJsx } from './no-match';

const mapStateToDispatch = {
  refreshAll,
};

export default connect(undefined, mapStateToDispatch)(NoMatchJsx);
