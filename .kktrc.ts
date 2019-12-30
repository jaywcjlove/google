import path from 'path';

export const moduleScopePluginOpts = [
  path.resolve(process.cwd(), 'data.json'),
];

export const loaderOneOf = [
  [require.resolve('@kkt/loader-less'), {}],
];
