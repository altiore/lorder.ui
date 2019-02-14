import { success } from 'react-notification-system-redux';

export interface INotification {
  message?: string;
  title?: string;
}

export const showSuccess = (opts: INotification) =>
  success({
    message: opts.message || 'Действие выполнено',
    title: opts.title || 'Успех!',
  });
