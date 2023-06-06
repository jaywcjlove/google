import path from 'path';
import { LoaderConfOptions, WebpackConfiguration } from 'kkt';
import lessModules from '@kkt/less-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';

export default (conf: WebpackConfiguration, env: 'development' | 'production', options: LoaderConfOptions) => {
  conf = lessModules(conf, env, options);
  conf = scopePluginOptions(conf, env, {
    ...options,
    allowedFiles: [path.resolve(process.cwd(), 'data.json')],
  });
  if (env === 'production') {
    conf.output = { ...conf.output, publicPath: './' };
  }
  return conf;
}
