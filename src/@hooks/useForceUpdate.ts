import { useCallback, useState } from 'react';

export const useForceUpdate = () => {
  const [v, setV] = useState();
  const forceUpdate = useCallback(() => {
    setV(v => v + 1);
  }, [setV]);
  return forceUpdate;
};
