import { IProjectRole, MAP_ROLE, ROLE_FLOW } from '@types';

export function getMemberRole(roles?: IProjectRole[]): string {
  if (!roles?.length) {
    return 'Участник';
  }

  const arch = roles.find(el => el.roleId === ROLE_FLOW.ARCHITECT);
  const mainDev = roles.find(el => el.roleId === ROLE_FLOW.DEVELOPER);
  const designer = roles.find(el => el.roleId === ROLE_FLOW.DESIGNER);

  return MAP_ROLE[(arch || mainDev || designer)?.roleId || roles[0].roleId];
}
