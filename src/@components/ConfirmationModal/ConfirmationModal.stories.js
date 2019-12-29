import React, { Fragment } from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import ModalDecorator from '@decorators/ModalDecorator';

import ConfirmationModal from '.';

storiesOf('ConfirmationModal', module)
  .addDecorator(ModalDecorator)
  .add('error', () => (
    <ConfirmationModal
      confirmText="Yes, delete Workflow"
      action="error"
      cancelText="No, Cancel"
      titleText={
        <Fragment>
          Workflow <strong>Beard dreamcatcher tumeric adaptogen</strong> is assigned to # items. Deleting this workflow
          will suspend all associated steps.
        </Fragment>
      }
      onConfirm={action('Actions')}
    />
  ))
  .add('info', () => (
    <ConfirmationModal
      confirmText="Yes, archive Workflow"
      action="info"
      cancelText="No, Cancel"
      titleText={
        <Fragment>
          Workflow <strong>Beard dreamcatcher tumeric adaptogen</strong> is assigned to # items. Deleting this workflow
          will suspend all associated steps.
        </Fragment>
      }
      onConfirm={action('Actions')}
    />
  ));
