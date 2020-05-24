interface IInfo {
  name: string;
  appVersion?: string;
  platform?: string;
  vendor?: string;
}

export const getUuid = () => {
  const info: IInfo = {
    name: 'common',
  };
  if ('navigator' in window) {
    if (navigator.appVersion) {
      info.appVersion = navigator.appVersion;
      info.name = window.btoa(info.appVersion);
    }
    if (navigator.platform) {
      info.platform = navigator.platform;
    }
    if (navigator.vendor) {
      info.vendor = navigator.vendor;
    }
  }

  return window.btoa(JSON.stringify(info));
};
