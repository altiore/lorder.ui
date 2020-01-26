import * as Sentry from '@sentry/browser';

function getEnv() {
  if (process.env.NODE_ENV !== 'production') {
    return process.env.NODE_ENV;
  }
  if (process.env.PUBLIC_URL === 'https://altiore.org') {
    return 'production';
  }
  if (process.env.PUBLIC_URL === 'https://staging-altiore.herokuapp.com') {
    return 'staging';
  }
  return 'unknown-environment';
}

export default function() {
  if (process.env.REACT_APP_SENTRY_DSN) {
    // @see https://docs.sentry.io/
    Sentry.init({
      debug: process.env.NODE_ENV === 'development' && process.env.REACT_APP_SENTRY_DEBUG === 'true',
      dsn: process.env.REACT_APP_SENTRY_DSN,
      environment: getEnv(),
      release: 'altiore.ui@' + process.env.REACT_APP_VERSION,
      beforeSend(event, hint) {
        if (event.exception) {
          Sentry.showReportDialog({
            eventId: event.event_id,
            title: 'Похоже произошла какая-то внутренняя ошибка.',
            subtitle: 'Наша команда разработчиков была извещена о проблеме',
            subtitle2: 'Если вы хотите помочь, опишите проблему более подробнее ниже',
            labelName: 'Имя',
            labelComments: 'Что произошло?',
            labelClose: 'Закрыть',
            labelSubmit: 'Отправить отчет',
            errorGeneric: 'Непредвиденная ошибка возникла при попытке отпрвить отчет. Пожалуйста, попробуйте снова',
            errorFormEntry: 'Некоторые поля заполнены с ошибками. Пожалуйста исправьте и попробуйте еще раз',
            successMessage: 'Ваш отчет был успешно отправлен. Спасибо!',
          });
        }
        return event;
      },
    });
  }
}
