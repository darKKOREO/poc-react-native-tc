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
cd ios && pod install && cd ..
# Requires Xcode 16.1+ and macOS 14.5+

# Start Metro bundler (Fast Refresh — use after first build)
npx expo start

# Full native build + install on Android TV emulator (required after adding native packages)
npx expo run:android

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

**Development workflow:** Run `npx expo run:android` once to build and install. After that, use `npx expo start` — saving any JS/TS file triggers Fast Refresh automatically. Only rebuild with `npx expo run:android` when adding native packages or changing `android/` files.

## Architecture

```
App.tsx               # Entry — imports Reactotron in __DEV__, mounts AppNavigator
src/
  navigation/         # React Navigation stack (RootStackParamList: Welcome, Home, Dashboard, Detail, Player)
  screens/
    Welcome/          # Sync screen: fetches TVMaze API → saves to AsyncStorage; shows Browse button when data exists
    Dashboard/        # Grid of TV shows loaded from AsyncStorage (4-column FlatList)
    Home/             # Menu screen (Movies, Series, Live TV, Settings)
  components/
    FocusableItem/    # TV-focusable primitive using Pressable — accepts children as ReactNode or render function ({focused}) => ReactNode
  services/
    api.ts            # TVMaze fetch via axios; logs request/response to Reactotron via tron()
    storage.ts        # AsyncStorage wrapper: saveShows / loadShows / hasShows
  hooks/
    useTVRemote.ts    # Unified D-pad input: keyboard events on web, useTVEventHandler on tvOS/Android TV
  utils/
    platform.ts       # isTV / isTvOS / isAndroidTV / isTizen / isWebOS flags + getPlatformName()
    reactotron.ts     # Reactotron setup (dev only); exports instance for use in services
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
- **Path alias**: `@/*` maps to `src/*` (tsconfig paths).
- **iOS uses Expo autolinking**: The Podfile uses `use_expo_modules!` and Expo's autolinking unless `EXPO_USE_COMMUNITY_AUTOLINKING=1` is set.
- **Multi-platform targeting**: Use `Platform.OS` and flags in `src/utils/platform.ts` for platform branches — never hardcode platform strings.

## Debugging

See `instructions.md` for the full Reactotron setup guide. Summary:
- Open Reactotron desktop app before starting the app
- Device connects automatically at `10.0.2.2:9090` (Android emulator host)
- `console.log` and `Reactotron.display()` both appear in the **Timeline** tab
- The **Network** tab will be empty — use the Timeline and look for `→ REQUEST` / `← RESPONSE` entries from `src/services/api.ts`
