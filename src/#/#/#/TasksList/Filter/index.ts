import { connect } from 'react-redux';

import { change, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { changeFilter, changeTasksFilter, projectId, searchTerm, tasksFilter } from '#/@store/tasksFilter';

import { onSubmitForm } from '../../../../@store/@common/helpers';
import { createUserTaskFormInitials } from '../../../../@store/project';
import { ownProjectListNoProjectFirst, selectedProject } from '../../../../@store/projects';
import { CREATE_USER_WORK_FORM_NAME, IUserWorkData, startUserWork } from '../../../../@store/user-works';

import { IStartFormProps } from '../../StartForm';
import { StartFormJsx } from '../../StartForm/StartForm';
import { FilterTsx } from './Filter';
import { styles } from './styles';

const mapState = createStructuredSelector({
  filter: searchTerm,
  projectId,
  projects: ownProjectListNoProjectFirst,
  // initialValues: createUserTaskFormInitials,
  // selectedProject,
} as any);

const mapDispatch = {
  changeFilter,
  changeTasksFilter,
};

export const Filter = withStyles(styles, { withTheme: true })(
  connect<any, any, any>(
    mapState,
    mapDispatch
  )(
    reduxForm<any, IStartFormProps>({
      enableReinitialize: true,
      form: CREATE_USER_WORK_FORM_NAME,
      onSubmit: onSubmitForm<IUserWorkData>(startUserWork),
      onSubmitSuccess(result: any, dispatch: any): void {
        dispatch(change(CREATE_USER_WORK_FORM_NAME, 'description', ''));
        // if ('activeElement' in document) {
        //     (document.activeElement as any).blur();
        // }
      },
    })(FilterTsx as any)
  )
);
