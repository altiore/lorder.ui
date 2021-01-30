import { connect } from 'react-redux';

import { getFormValues } from 'redux-form';

import ProjectCard from '@components/project-card';

import { openedProject, UPDATE_PROJECT_FORM } from '#/@store/projects';
import { ROUTE } from '#/@store/router';

const mapToState = state => {
  const formValues: any = getFormValues(UPDATE_PROJECT_FORM)(state);
  const project = openedProject(state);
  return {
    color: formValues?.viewColor,
    logoSrc: undefined,
    logoVariant: formValues?.viewType,
    membersCount: 2457,
    projectLink: project?.statistic ? ROUTE.PUBLIC.ONE(project.statistic.uuid) : '#',
    title: formValues?.title,
    value: 980000,
  };
};

export default connect(mapToState)(ProjectCard);
