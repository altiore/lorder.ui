import { error, success, warning } from 'react-notification-system-redux';

import { INotification } from 'src/@types';

export const showError = (opts: INotification, report = false) =>
  error({
    action: report
      ? {
          callback: () => console.log('report'),
          label: 'Сообщить об ошибке',
        }
      : undefined,
    ...opts,
    message: opts.message || 'Что-то пошло не так',
    title: opts.title || 'Ошибка!',
  });

export const showSuccess = (opts: INotification) =>
  success({
    ...opts,
    message: opts.message || 'Действие выполнено',
    title: opts.title || 'Успех!',
  });

export const showWarning = (opts: INotification) =>
  warning({
    ...opts,
    message: opts.message || 'Действие выполнено',
    title: opts.title || 'Предупреждение!',
  });
