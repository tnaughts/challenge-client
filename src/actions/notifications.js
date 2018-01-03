export const LEVELS = {
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success'
};

const TIMEOUT = 3000;

export const dismiss = (key) => ({
  type: 'DISMISS_NOTIFICATION',
  key
});

export const dismissAll = () => ({
  type: 'DISMISS_ALL_NOTIFICATIONS'
});

const _notify = (level, key, message, timeoutId) => ({
  type: 'DISPLAY_NOTIFICATION',
  key,
  level,
  message,
  timeoutId
});

const _notifyTimeout = (level, key, message) => {
  return (dispatch) => {
    let timeoutId = setTimeout(() => {
      dispatch(dismiss(key));
    }, TIMEOUT);
    dispatch(_notify(level, key, message, timeoutId));
  };
};

export const info = _notifyTimeout.bind(null, LEVELS.info);
export const warning = _notifyTimeout.bind(null, LEVELS.warning);
export const error = _notifyTimeout.bind(null, LEVELS.error);
export const success = _notifyTimeout.bind(null, LEVELS.success);
