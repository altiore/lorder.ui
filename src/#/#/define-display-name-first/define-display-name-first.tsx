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
      text="Вы не сможете полноценно пользоваться приложением, пока не зададите публичное имя. Оно используется для характеристики вашего аккаунта"
      warningText="Как ты хотел бы, чтоб мы тебя называли?"
      onClose={onClose}
    />
  );
};
