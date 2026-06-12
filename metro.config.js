const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// react-native is aliased to react-native-tvos (npm:react-native-tvos), but
// react-native-tvos ships its own bundled copy of plain react-native under
// node_modules/react-native/node_modules/react-native (used by its internal
// deps like @react-native-tvos/virtualized-lists). Force every
// `react-native`/`react-native/...` import to resolve to the single
// top-level react-native-tvos copy to avoid duplicate module instances.
const reactNativePath = path.resolve(__dirname, 'node_modules/react-native');
const defaultResolveRequest = defaultConfig.resolver.resolveRequest;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'react-native' || moduleName.startsWith('react-native/')) {
        const rest = moduleName.slice('react-native'.length);
        return context.resolveRequest(context, `${reactNativePath}${rest}`, platform);
      }
      return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
