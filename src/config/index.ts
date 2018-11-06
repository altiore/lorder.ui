let localConfig: {
  BASE_URL: string;
  VERSION: string;
};

if (process.env.NODE_ENV === 'development') {
  localConfig = require('./dev');
} else {
  localConfig = require('./prod');
}
export const config = { ...require('./common'), ...localConfig };
