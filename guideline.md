# Development Guideline

Conventions and architecture rules for extending this project. For first-time setup and run commands, see [installation.md](installation.md). For a condensed agent/AI reference, see [CLAUDE.md](CLAUDE.md).

## 1. What this project is

A React Native POC built on **`react-native-tvos`** (bare RN CLI, no Expo) that currently hosts three demo modules in one app:

| Module | Entry | Theme | Input model |
|---|---|---|---|
| **MyTV** (offline-first TV streaming demo) | Welcome → Dashboard | Dark (`src/theme`) | TV remote / D-pad |
| **Map Demo** (clustered project map) | Welcome → Map Demo | Dark | Touch + D-pad |
| **SC Asset** (iPad sales-presenter, 5 screens) | Welcome → SC Asset | Light (`src/screens/ScAsset/theme.ts`) | Touch (iPad) |

Targets: tvOS, Android TV, iPad/iOS, plus Tizen/webOS via `react-native-web` (`src/platforms/web/build-web.sh`).

## 2. Project structure

```
src/
  navigation/index.tsx     # Single native stack — ALL routes live in RootStackParamList
  screens/
    Welcome/               # App entry hub: sync flow + module launcher rail
    Dashboard/             # MyTV: grid of shows read from AsyncStorage only
    Home/                  # MyTV: menu screen
    MapProject/            # Map demo: MapLibre + supercluster
    ScAsset/               # SC Asset module (self-contained — see §5)
      theme.ts             #   light design tokens (separate from src/theme)
      data.ts              #   mock projects, price formatters, filter options
      components/          #   ScHeader (tab nav), ProjectCard
      *Screen.tsx          #   Present / ProjectDetail / Register / Consult / Browse
  components/              # Cross-module primitives (FocusableItem, BackButton)
  services/                # api.ts (axios+TVMaze), storage.ts, imageDownloader.ts, projects.ts, mapTiles.ts
  hooks/useTVRemote.ts     # Unified D-pad input (web keyboard / native TV events)
  utils/platform.ts        # isTV / isTvOS / isAndroidTV / isTizen / isWebOS
  config/mapConfig.ts      # MapTiler key + style URL
  theme/index.ts           # Dark TV design tokens
```

## 3. Non-negotiable constraints

These exist for specific, hard-won reasons — do not undo them:

1. **`react-native` is aliased to `npm:react-native-tvos`** in `package.json`, and `metro.config.js` overrides `resolver.resolveRequest` to force every `react-native` import to the single top-level copy. **Never remove this override** — react-native-tvos bundles a nested plain `react-native` and you'll get duplicate-module crashes without it.
2. **HTTP client is axios, not `fetch`.** Hermes-native `fetch` bypasses the JS layer, so Reactotron logging breaks. Log requests manually via `tron()` (see `src/services/api.ts`).
3. **Offline-first contract (MyTV):** only the Welcome screen fetches the network; Dashboard reads exclusively from AsyncStorage. Keep this separation when extending MyTV.
4. **`@dr.pogodin/react-native-fs` has no default export.** Always use named imports (`import { DocumentDirectoryPath, downloadFile } from ...`). A default import is silently `undefined` and crashes at first property access.
5. **Use `Pressable`, not `TouchableHighlight`,** for anything focusable — `TouchableHighlight.onFocus` doesn't fire on Android TV.
6. **Never hardcode platform strings.** Branch on `Platform.OS` or the flags in `src/utils/platform.ts`.
7. **New Architecture (Fabric) + Hermes are on.** Test native-leaning code (e.g. `measureLayout`, refs into native views) on a device/emulator, not just by type-checking.

## 4. Adding a screen — checklist

1. Create `src/screens/<Module>/<Name>Screen.tsx` (or a folder with `index.tsx` for the older modules).
2. Add the route to `RootStackParamList` in `src/navigation/index.tsx` **and** register a `<Stack.Screen>`. Params are typed there — keep them minimal (pass IDs, not objects).
3. Pick the right theme: dark `theme` for TV modules, `scTheme` for SC Asset. Don't mix tokens across modules.
4. Input model:
   - **TV screens**: wrap interactive elements in `FocusableItem`, set `hasTVPreferredFocus` on the first item, use the render-function child form (`{({focused}) => ...}`) when text/icon color must change on focus. For horizontal rails, follow the Welcome-screen pattern: `ScrollView horizontal` + per-item `View` refs (`collapsable={false}`) + `measureLayout` → `scrollTo` on focus.
   - **iPad/touch screens**: plain `Pressable` with pressed/selected styles; no focus management needed.
5. Responsive sizing: prefer `flex` ratios and `useWindowDimensions()` (see PresentScreen's hero `height: height / 1.5`) over hardcoded pixel sizes, so layouts survive both iPad orientations.
6. Verify: `npx tsc --noEmit`, then run on a simulator/emulator and check the actual rendering — layout bugs (wrapping tabs, clipped rails) don't show up in the type checker.

## 5. SC Asset module specifics

- **Self-contained by design**: theme, data, and components live under `src/screens/ScAsset/`. Only `RootStackParamList` and the Welcome rail know about it. Keep new SC screens inside the module.
- **Navigation map**: `ScHeader` owns the tab→route mapping (`Present/Consult/Browse/Register`). New top-level SC screens should be added there, not as ad-hoc buttons.
- **Data is mock and in-memory** (`data.ts`). When a backend arrives, replace `SC_PROJECTS`/`getProject` with a service in `src/services/` and keep the `ScProject` shape (or map into it) so screens don't change.
- **Known POC shortcuts** (replace before production):
  - House photos are remote Unsplash URLs; the QR code is rendered by `api.qrserver.com`. Both need network. For offline parity with MyTV, cache via `imageDownloader.ts` and generate QR locally (e.g. `react-native-qrcode-svg` — needs `react-native-svg`, a native dep → full rebuild + `pod install`).
  - Register form does no validation and only sets local state on save.
  - Browse-screen filter chips and Consult selections are display-only — they don't actually filter `SC_PROJECTS` yet (the search box does).
  - Icons are emoji; swap for an icon set if design requires pixel fidelity.
- **Map**: BrowseScreen reuses `MAP_STYLE_URL` (MapTiler key in `src/config/mapConfig.ts`) and zoom bounds from `src/services/mapTiles.ts`. If you need clustering for many projects, copy the `supercluster` pattern from `src/screens/MapProject/index.tsx`.
- **Thai copy**: keep UI strings in Thai as designed. If localization becomes a requirement, extract strings to a module-level constants file first — don't scatter translations through screens.

## 6. Native dependencies

Adding any package with native code requires the full cycle:

```bash
npm install <pkg>
cd ios && bundle exec pod install && cd ..
npx react-native run-ios      # or run-android — full rebuild, Fast Refresh is not enough
```

JS-only packages need only a Metro restart at most. When in doubt: if the package README mentions `pod install` or autolinking, it's native.

## 7. Quality gates

Run before considering any change done:

```bash
npx tsc --noEmit     # type check — must be clean
npm test             # Jest
npm run format       # Prettier
```

Plus a visual check on the platform the change targets (`xcrun simctl io booted screenshot /tmp/x.png` is handy for iPad; `adb exec-out screencap` for Android TV). Commit only when explicitly intended; `ios/`/`android/` build artifacts and `local.properties` are gitignored — keep them that way.

## 8. Debugging

- Reactotron desktop app → Timeline tab. Network calls appear as `→ REQUEST` / `← RESPONSE` entries (the Network tab stays empty under Hermes — this is expected).
- Android emulator connects at `10.0.2.2:9090`; if you restart an emulator with Metro already running, re-run `adb reverse tcp:8081 tcp:8081`.
- "Parsing source code unsupported" red toast after a Fast Refresh = broken HMR update; relaunch the app (full bundle fetch) rather than chasing a phantom syntax error.

## 9. Suggested next steps (backlog)

- Wire Consult selections → Browse filtering (single source of truth for filter state, e.g. route params or a lightweight context).
- Replace SC mock data with a real API service + AsyncStorage cache, mirroring the MyTV offline-first flow.
- Local QR generation + cached project images for fully offline sales presentations.
- Register form: validation, Thai phone formatting, and a submission target.
- Landscape-orientation pass for SC screens on iPad (current layouts are portrait-first; flex ratios mostly hold but the Present hero and Browse split deserve a check).
- E2E touch automation (Maestro or Detox) — there's currently no tap-capable tooling on the simulator, which limits automated UI verification.
