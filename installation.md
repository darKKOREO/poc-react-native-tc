# Installation & Setup

Step-by-step instructions for getting this project (bare React Native CLI, `react-native-tvos`) running locally.

## Prerequisites

- **Node.js** 20+
- **Ruby + Bundler** (for CocoaPods, iOS only) — `gem install bundler` if you don't have it
- **Xcode 16.1+** and **macOS 14.5+** (iOS/tvOS)
- **Android Studio** with an Android SDK + at least one emulator (Android TV recommended, e.g. `Television_1080p`)
- **Watchman** (recommended for Metro file watching on macOS): `brew install watchman`

## 1. Install JS dependencies

```bash
npm install
```

## 2. iOS setup

Install Ruby gems (CocoaPods) and then the pods:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

Re-run `bundle exec pod install` any time you add/remove a native dependency in `package.json`.

## 3. Android setup

Make sure `android/local.properties` points at your Android SDK, e.g.:

```properties
sdk.dir=/Users/<you>/Library/Android/sdk
```

Start an emulator (or plug in an Android TV device):

```bash
$ANDROID_HOME/emulator/emulator -avd Television_1080p
```

## 4. Run the app

**iOS (simulator):**

```bash
npm run ios
# or target a specific simulator:
npx react-native run-ios --simulator "iPhone 17"
```

**Android (emulator/device):**

```bash
npm run android
```

Both commands do a full native build + install, then start Metro automatically if it isn't already running.

## 5. Day-to-day development

After the first successful build, just start Metro and use Fast Refresh — no need to rebuild natively unless you add a native package or edit `ios/`/`android/`:

```bash
npm start
```

Then save any `.ts`/`.tsx` file and the app updates automatically.

## 6. Web build (Tizen / webOS)

```bash
bash src/platforms/web/build-web.sh
```

Output goes to `web-build/` — deploy with Tizen Studio or `ares-package`.

## Other commands

```bash
npm test          # run Jest tests
npm run format    # prettier --write .
npx tsc --noEmit  # TypeScript type check
```

## Troubleshooting

- **Port 8081 already in use**: kill the stale Metro process (`lsof -i :8081`, then `kill -9 <pid>`) and restart with `npm start`.
- **Duplicate `react-native` module errors**: `react-native` is aliased to `react-native-tvos`, which bundles its own internal copy of plain `react-native`. `metro.config.js` already forces all `react-native` imports to resolve to the top-level `node_modules/react-native` — don't remove this override.
- **iOS build fails with disk space errors**: clear `~/Library/Developer/Xcode/DerivedData` and `ios/build/`.
- **Android build fails with disk space errors**: clear `~/.gradle/caches` and `android/app/build/`.
