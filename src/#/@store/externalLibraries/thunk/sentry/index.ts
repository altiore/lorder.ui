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
            errorFormEntry: 'Некоторые поля заполнены с ошибками. Пожалуйста исправьте и попробуйте еще раз',
            errorGeneric: 'Непредвиденная ошибка возникла при попытке отпрвить отчет. Пожалуйста, попробуйте снова',
            eventId: event.event_id,
            labelClose: 'Закрыть',
            labelComments: 'Что произошло?',
            labelName: 'Имя',
            labelSubmit: 'Отправить отчет',
            subtitle: 'Наша команда разработчиков была извещена о проблеме',
            subtitle2: 'Если вы хотите помочь, опишите проблему более подробнее ниже',
            successMessage: 'Ваш отчет был успешно отправлен. Спасибо!',
            title: 'Похоже произошла какая-то внутренняя ошибка.',
          });
        }
        return event;
      },
    });
  }
}
