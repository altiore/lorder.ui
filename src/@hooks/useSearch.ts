import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import debounce from 'lodash/debounce';

export const useSearch = <L>(list: L[], getEl: (el: L) => string) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = useMemo<L[]>(() => {
    if (searchTerm && list && list.length) {
      return list.filter(m =>
        getEl(m)
          ?.toLowerCase()
          .includes((searchTerm || '').toLowerCase())
      );
    }

    return list || [];
  }, [getEl, searchTerm, list]);

  const handler = useCallback(debounce(setSearchTerm, 500), []);

  const onChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      handler(evt.currentTarget.value);
    },
    [handler]
  );

  return { searchTerm, onChange, filtered };
};
