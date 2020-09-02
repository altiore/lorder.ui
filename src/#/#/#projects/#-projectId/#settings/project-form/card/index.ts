import { connect } from 'react-redux';

import { getFormValues } from 'redux-form';

import ProjectCard from '@components/project-card';

import { UPDATE_PROJECT_FORM } from '#/@store/projects';

const mapToState = state => {
  const formValues: any = getFormValues(UPDATE_PROJECT_FORM)(state);
  return {
    color: formValues?.viewColor,
    logoSrc: undefined,
    logoVariant: formValues?.viewType,
    membersCount: 2457,
    projectLink: '',
    title: formValues?.title,
    value: 980000,
  };
};

export default connect(mapToState)(ProjectCard);
