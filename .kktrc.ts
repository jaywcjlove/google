import path from 'path';
import { Configuration } from 'webpack';
import { OptionConf } from 'kkt/lib/config/webpack.config';

export const moduleScopePluginOpts = [
  path.resolve(process.cwd(), 'data.json'),
];

export const loaderOneOf = [
  [require.resolve('@kkt/loader-less'), {}],
];


export default (conf: Configuration, opts: OptionConf, webpack) => {
  if (opts.isEnvProduction) {
    conf.output.publicPath = './';
  }
  return conf;
}
