import { useMemo } from 'react';

import { ROLES } from '#/@store/roles';

import { ACCESS_LEVEL, IRoute, ROLE } from '@types';

export function useAllowedRoutes(routes: IRoute[], userRole: ROLE, accessLevel?: ACCESS_LEVEL) {
  return useMemo(() => {
    return routes.filter((route: IRoute) => {
      if (!route.access) {
        return true;
      }
      return Boolean(
        (route.access[0] || ROLES.ALL).includes(userRole) &&
          (route.access[1] === undefined ||
            (accessLevel !== undefined &&
              (route.access[2] ? accessLevel === route.access[1] : accessLevel >= route.access[1])))
      );
    });
  }, [accessLevel, routes, userRole]);
}
