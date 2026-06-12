# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

A React Native TV app POC targeting tvOS, Android TV, Tizen (Samsung), and webOS (LG). The web platform (Tizen/webOS) uses `react-native-web` to render via a browser-based bundle. The app is **offline-first**: data is fetched from TVMaze once and stored on-device via AsyncStorage; the Dashboard reads only from local storage.

## Commands

```bash
# Install dependencies (required before anything else)
npm install

# iOS — install pods after npm install or when adding native packages
cd ios && bundle install && bundle exec pod install && cd ..
# Requires Xcode 16.1+ and macOS 14.5+

# Start Metro bundler (Fast Refresh — use after first build)
npx react-native start

# Full native build + install on Android TV emulator (required after adding native packages)
npx react-native run-android

# Full native build + install on iOS simulator (required after adding native packages)
npx react-native run-ios

# Web bundle for Tizen / webOS
bash src/platforms/web/build-web.sh
# Output → web-build/; deploy with Tizen Studio or ares-package

# Run tests
npm test

# Format code
npm run format

# TypeScript type check
npx tsc --noEmit
```

**Development workflow:** Run `npx react-native run-android` (or `run-ios`) once to build and install. After that, use `npx react-native start` — saving any JS/TS file triggers Fast Refresh automatically. Only rebuild with `run-android`/`run-ios` when adding native packages or changing `android/`/`ios/` files.

## Architecture

```
App.tsx               # Entry — imports Reactotron in __DEV__, mounts AppNavigator
src/
  navigation/         # React Navigation stack (RootStackParamList: Welcome, Home, Dashboard, Detail, Player, MapProject)
  screens/
    Welcome/          # Sync screen: fetches TVMaze API → saves to AsyncStorage; shows Browse button when data exists; "Map Demo" button → MapProject
    Dashboard/        # Grid of TV shows loaded from AsyncStorage (4-column FlatList)
    Home/             # Menu screen (Movies, Series, Live TV, Settings)
    MapProject/       # Offline MapLibre map of Bangkok with project price bubbles, clustering, and a synced project list panel — see MAP_SETUP.md
  components/
    FocusableItem/    # TV-focusable primitive using Pressable — accepts children as ReactNode or render function ({focused}) => ReactNode
  services/
    api.ts            # TVMaze fetch via axios; logs request/response to Reactotron via tron()
    storage.ts        # AsyncStorage wrapper: saveShows / loadShows / hasShows
    imageDownloader.ts # Downloads show images to disk via @dr.pogodin/react-native-fs for offline caching
  hooks/
    useTVRemote.ts    # Unified D-pad input: keyboard events on web, useTVEventHandler on tvOS/Android TV
  utils/
    platform.ts       # isTV / isTvOS / isAndroidTV / isTizen / isWebOS flags + getPlatformName()
    reactotron.ts     # Reactotron setup (dev only); exports instance for use in services
  config/
    mapConfig.ts      # MAPTILER_API_KEY + MAP_STYLE_URL for the offline map style
  theme/index.ts      # Centralized design tokens (colors, spacing, fontSize, borderRadius)
  platforms/web/      # Web-specific build script
```

## Key Design Decisions

- **`FocusableItem` uses `Pressable`, not `TouchableHighlight`**: `TouchableHighlight.onFocus` does not fire reliably on Android TV. `Pressable` fires `onFocus`/`onBlur` correctly on D-pad navigation.
- **Children as render function**: `FocusableItem` accepts `children` as either `ReactNode` or `({focused}) => ReactNode`. Use the render function form when the child text/icon needs to change color on focus (e.g. white background → dark text).
- **Focus styling**: focused state = white background + red border + 1.1x scale. Unfocused = dark `surface` background. Always set `hasTVPreferredFocus` on the first item of each screen.
- **Data flow**: Welcome screen fetches → AsyncStorage. Dashboard reads only from AsyncStorage — never fetches directly. This enforces the offline-first contract.
- **HTTP client is `axios`, not `fetch`**: `fetch` in React Native 0.85 + Hermes is native and bypasses JS-layer interceptors. Axios uses `XMLHttpRequest` and is required for Reactotron network logging to work.
- **Reactotron network logging is manual**: Reactotron's built-in Network tab does not capture requests (Hermes incompatibility). Network calls are logged explicitly via `tron()` in `src/services/api.ts` using `Reactotron.display()`, which shows in the Timeline tab.
- **Navigation**: `RootStackParamList` is defined in `src/navigation/index.tsx`. Add new screen types there when adding screens.
- **Path alias**: `@/*` maps to `src/*` — configured via `babel-plugin-module-resolver` in `babel.config.js` (and mirrored in `tsconfig.json` for the type checker).
- **Bare React Native CLI**: This is a bare RN CLI project (no Expo). iOS dependencies are managed via CocoaPods through Bundler (`Gemfile` / `bundle exec pod install`); Android autolinking is the standard `@react-native-community/cli` autolinking.
- **`react-native` is aliased to `react-native-tvos`**: `package.json` aliases `react-native` to `npm:react-native-tvos@^0.85.3-0`. `react-native-tvos` bundles its own nested copy of plain `react-native` for its internal deps — `metro.config.js` overrides `resolver.resolveRequest` to force every `react-native`/`react-native/*` import to resolve to the single top-level `node_modules/react-native` (react-native-tvos), preventing duplicate module instances. Do not remove this override.
- **New Architecture (Fabric/TurboModules) + Hermes** are enabled by default (`android/gradle.properties`: `newArchEnabled=true`, `hermesEnabled=true`; iOS `Info.plist`: `RCTNewArchEnabled: true`).
- **Multi-platform targeting**: Use `Platform.OS` and flags in `src/utils/platform.ts` for platform branches — never hardcode platform strings.
- **Map Demo (`MapProject`)**: Uses `@maplibre/maplibre-react-native` (native module — requires `pod install` / `expo run:android` after install, see MAP_SETUP.md) and `supercluster` for marker clustering. The Bangkok offline tile pack is downloaded once via `ensureOfflinePack()` (`src/services/mapTiles.ts`); panning is restricted to `BANGKOK_BOUNDS` so the map stays usable offline. Mock project data (`src/services/projects.ts`) is seeded into AsyncStorage on first load via `saveProjects`/`loadProjects`/`hasProjects`, following the same offline-first pattern as the TVMaze data.

## Debugging

See `instructions.md` for the full Reactotron setup guide. Summary:

- Open Reactotron desktop app before starting the app
- Device connects automatically at `10.0.2.2:9090` (Android emulator host)
- `console.log` and `Reactotron.display()` both appear in the **Timeline** tab
- The **Network** tab will be empty — use the Timeline and look for `→ REQUEST` / `← RESPONSE` entries from `src/services/api.ts`

<!-- headroom:learn:start -->

## Headroom Learned Patterns

_Auto-generated by `headroom learn` on 2026-06-12 — do not edit manually_

### Environment

_~8,000 tokens/session saved_

- `adb`, `emulator` are NOT on PATH. Use `$HOME/Library/Android/sdk/platform-tools/adb` and `$HOME/Library/Android/sdk/emulator/emulator`, or prefix commands with `export ANDROID_HOME="$HOME/Library/Android/sdk" && export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator"`. `ANDROID_HOME` is unset in the user's shell.
- `android/local.properties` must contain `sdk.dir=/Users/pishetshotisak/Library/Android/sdk` for Gradle builds (it is gitignored and has gone missing twice — recreate it if `SDK location not found` appears).

### Package Management

_~6,000 tokens/session saved_

- Use **npm only — never yarn** (explicit user directive; `yarn.lock` was deliberately deleted).
- Plain `npm install <pkg>` fails with ERESOLVE peer-dependency conflicts (react 19.2.x vs react-dom). Always run `npm install --legacy-peer-deps` on the first attempt — do not try without the flag first.

### Commands

_~5,000 tokens/session saved_

- This project no longer uses Expo: never run `npx expo run:*`, `npx expo install`, or `npx expo prebuild` — use `npx react-native run-ios` / `run-android` and `bundle exec pod install`.
- Before `npx tsc --noEmit` on a fresh checkout/branch, ensure `node_modules/@tsconfig/react-native` exists (root tsconfig extends it); if missing, run `npm install --legacy-peer-deps` first or tsc fails with TS6053.
- If Metro fails with `EADDRINUSE :8081`, kill the stale process via `lsof -ti :8081 | xargs kill -9` before restarting.

### Simulator Verification

_~4,000 tokens/session saved_

- No UI-tap tooling is installed (`applesimutils`/`idb` absent; osascript lacks assistive access). To visually verify a specific screen on the iOS/iPad simulator, temporarily change `initialRouteName` in `src/navigation/index.tsx`, relaunch the app with `xcrun simctl terminate/launch`, and capture `xcrun simctl io <device> screenshot /tmp/x.png` — then revert the route.
- The iPad simulator in use is `iPad Pro 13-inch (M5)`; the iPhone simulator is `iPhone 17`. App bundle id: `com.anonymous.MyTVApp`.

<!-- headroom:learn:end -->
