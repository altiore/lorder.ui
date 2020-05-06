import React, { useCallback } from 'react';

import copyCodeBlock from '@pickra/copy-code-block';
import { ConnectedRouter } from 'connected-react-router';
import { connect, Provider } from 'react-redux';

import Button from '@components/Button';

import { createStore, history } from '@store/createStore';
import { showModal, closeModal } from '@store/modal';

import Modals from '../domains/@common/Modals';

const { store } = createStore();

/* eslint-disable */
const Wrapper = ({ children, componentPath = '@components/MyModalComponent' }) => {
  const pices = componentPath.split('/');
  const componentName = pices[pices.length - 1];
  return (
    <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
      <div style={{ padding: '0 16px', width: '100%' }}>{children}</div>
      <div
        style={{ flexGrow: 1 }}
        dangerouslySetInnerHTML={{
          __html: copyCodeBlock(`
import React, { useCallback } from "react";

import Button from "@components/Button";
import { showModal } from "@store/modal";
import ${componentName} from "${componentPath}";

const OpenModal = ({ showModal }) => {
  const onShowModal = useCallback(() => {
    showModal(<${componentName} />, {
      fullWidth: false,
      maxWidth: "md",
    });
  }, [showModal]);

  return (
    <Button onClick={onShowModal}>
      Open Modal
    </Button>
  );
};

const mapDispatch = {
  showModal,
};

const CreateOpenModal = connect(undefined, mapDispatch)(OpenModal);`),
        }}
      />
    </div>
  );
};

const OpenModal = ({ showModal, children }) => {
  const onShowPreview = useCallback(
    settings => () => {
      showModal(children, settings);
    },
    [showModal, children]
  );

  return (
    <div>
      <a href="https://material-ui.com/api/dialog/" target="_blank" rel="noopener noreferrer">
        Dialog settings here
      </a>
      <Wrapper>
        <Button onClick={onShowPreview()}>Empty Settings</Button>

        <Button onClick={onShowPreview({ fullWidth: true })}>With fullWidth: true</Button>

        <Button onClick={onShowPreview({ maxWidth: 'xs' })}>With maxWidth: &quot;xs&quot;</Button>

        <Button onClick={onShowPreview({ maxWidth: 'sm' })}>With maxWidth: &quot;sm&quot;</Button>

        <Button onClick={onShowPreview({ maxWidth: 'md' })}>With maxWidth: &quot;md&quot;</Button>

        <Button onClick={onShowPreview({ maxWidth: 'lg' })}>With maxWidth: &quot;lg&quot;</Button>

        <Button onClick={onShowPreview({ maxWidth: 'xl' })}>With maxWidth: &quot;xl&quot;</Button>
      </Wrapper>
    </div>
  );
};

const mapDispatch = {
  closeModal,
  showModal,
};

const CreateOpenModal = connect(
  null,
  mapDispatch
)(OpenModal);

const ModalDecorator = getStory => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CreateOpenModal>{getStory()}</CreateOpenModal>
      <Modals />
    </ConnectedRouter>
  </Provider>
);

export default ModalDecorator;
/* eslint-enable */
