import { useCallback, useEffect, useState } from 'react';

import debounce from 'lodash/debounce';

export interface IDimensions {
  height: number;
  scrollHeight: number;
  scrollWidth: number;
  width: number;
}

const defDimensions = {
  height: 0,
  scrollHeight: 0,
  scrollWidth: 0,
  width: 0,
};

const useResize = (nodeEl?: any, wait: number = 500): IDimensions => {
  const [dimensions, setDimensions] = useState<IDimensions>(defDimensions);

  const handleResize = useCallback(
    debounce(() => {
      if (nodeEl) {
        setDimensions({
          height: nodeEl.offsetHeight,
          scrollHeight: nodeEl.clientHeight,
          scrollWidth: nodeEl.clientWidth,
          width: nodeEl.offsetWidth,
        });
      } else {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const w = window;
          const d = document;
          const e = d.documentElement;
          const g = d.getElementsByTagName('body')[0];
          setDimensions({
            height: w.innerHeight || (e && e.clientHeight) || g.clientHeight,
            scrollHeight: (e && e.clientHeight) || g.clientHeight,
            scrollWidth: (e && e.clientWidth) || g.clientWidth,
            width: w.innerWidth || (e && e.clientWidth) || g.clientWidth,
          });
        }
      }
    }, wait),
    [nodeEl, wait]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize, false);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [handleResize]);

  return dimensions;
};

export default useResize;
