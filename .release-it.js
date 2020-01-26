module.exports = {
  git: {
    requireCleanWorkingDir: false,
    requireUpstream: false,
    pushArgs: '--no-verify',
    commitArgs: '--no-verify',
  },
  npm: {
    publish: false,
  },
};
