import { IProjectRole, MAP_ROLE, ROLE_FLOW } from '@types';

export function getMemberRole(roles?: IProjectRole[]): string {
  if (!roles?.length) {
    return 'Участник';
  }

  const arch = roles.find(el => el.roleId === ROLE_FLOW.ARCHITECT);
  const mainDev = roles.find(el => el.roleId === ROLE_FLOW.LEAD_DEVELOPER);
  const designer = roles.find(el => el.roleId === ROLE_FLOW.DESIGNER);
  const beDev = roles.find(el => el.roleId === ROLE_FLOW.BE_DEVELOPER);
  const feDev = roles.find(el => el.roleId === ROLE_FLOW.FE_DEVELOPER);

  return MAP_ROLE[(arch || mainDev || designer || beDev || feDev)?.roleId || roles[0].roleId];
}
