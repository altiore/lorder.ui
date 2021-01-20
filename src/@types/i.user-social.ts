export enum SOCIAL_FLOW {
  TELEGRAM = 'Telegram',
  GITHUB = 'GitHub',
  LINKEDIN = 'LinkedIn',
}

export interface IUserSocial {
  readonly id: number;
  readonly userId: number;
  readonly socialType: SOCIAL_FLOW;
  readonly socialLink: string;
}
