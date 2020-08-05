import React from 'react';

import ConfirmationModal, { ACTION_TYPE } from '@components/confirmation-modal';

interface IWrongPasswordDialog {
  onClose?: any;
  updatePassword: any;
}

export const WrongPasswordDialog: React.FC<IWrongPasswordDialog> = ({ updatePassword, onClose }): JSX.Element => {
  return (
    <ConfirmationModal
      action={ACTION_TYPE.INFO}
      confirmText="Активировать пароль"
      onConfirm={updatePassword}
      titleText="Вы ввели неверный пароль 2 или более раз подряд"
      text={`Это может означать, что в целях безопастности, мы сбросили Ваш пароль (мы можем это сделать, если был риск утечки данных). Нажмите "Активировать пароль", чтоб выслать письмо для активации введенного пароля. Нажмите "Отмена", чтоб попытаться ввести пароль еще раз`}
      warningText="Мы заботимся о безопасности Ваших данных"
      onClose={onClose}
    />
  );
};
