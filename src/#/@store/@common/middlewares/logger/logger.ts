export const logger = () => {
  return (next: any) => {
    return (action: any) => {
      console.log(action.type, {
        action,
      });
      return next(action);
    };
  };
};
