export const logger = () => {
  return (next: any) => {
    return (action: any) => {
      console.log('logger middleware', {
        action,
      });
      return next(action);
    };
  };
};