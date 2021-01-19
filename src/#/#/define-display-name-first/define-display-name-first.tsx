import React from 'react';

import ConfirmationModal, { ACTION_TYPE } from '@components/confirmation-modal';

interface IProps {
  onClose?: any;
  updatePassword: any;
}

export const DefineDisplayNameFirst: React.FC<IProps> = ({ onClose }): JSX.Element => {
  return (
    <ConfirmationModal
      action={ACTION_TYPE.INFO}
      confirmText="Задать публичное имя"
      onConfirm={onClose}
      titleText="Сначала задайте публичное имя!"
      text="Публичное имя могут видеть другие пользователи"
      warningText="Как ты хотел бы, чтоб мы тебя называли?"
      onClose={onClose}
    />
  );
};
