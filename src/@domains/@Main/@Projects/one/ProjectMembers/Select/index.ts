import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { mapEnum } from '@store/@common/helpers';
import { ACCESS_LEVEL } from '@store/projects';
import { updateMemberLevel } from '@store/projects/members';
import { routeProjectId } from '@store/router';

import { SelectTsx } from './Select';

const getAccessLevels = () =>
  mapEnum(ACCESS_LEVEL, (accessLevel: number) => ({
    icon: '',
    label: ACCESS_LEVEL[accessLevel],
    value: accessLevel,
  }));

const mapState = createStructuredSelector({
  items: getAccessLevels,
  projectId: routeProjectId,
} as any);

const mapDispatch = {
  onChange: updateMemberLevel,
};

export default connect<any, any, any>(
  mapState,
  mapDispatch
)(SelectTsx);
