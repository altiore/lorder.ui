import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { getAllWebHooks, webHookList } from '#/@store/webhooks';

import { WebHooksJsx } from './web-hooks';

const mapState = createStructuredSelector({
  list: webHookList,
} as any);

const mapDispatch = {
  getAllWebHooks,
};

export default connect(
  mapState,
  mapDispatch
)(WebHooksJsx);
