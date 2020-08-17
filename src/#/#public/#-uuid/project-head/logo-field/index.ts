import { connect } from 'react-redux';

import ImgFieldRound from '@components/img-field-round';

import { uploadLogo } from '#/@store/projects';

const mapDispatch = {
  uploadFile: uploadLogo,
};

export default connect(undefined, mapDispatch)(ImgFieldRound);
