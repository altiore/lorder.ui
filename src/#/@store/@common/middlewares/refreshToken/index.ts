export const refreshTokenMiddleware = () => {
  return (next: any) => {
    return (action: any) => {
      if (action && action.payload && action.payload.request) {
        // console.log('before request');
      }
      return next(action);
    };
  };
};
