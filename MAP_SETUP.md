# MapProject Setup

The "Map Demo" screen (`src/screens/MapProject`) uses [MapLibre Native](https://maplibre.org/maplibre-react-native/)
to render an offline map of Bangkok with project price bubbles and a synced
project list panel.

## 1. Native rebuild required

`@maplibre/maplibre-react-native` adds native code, so a JS-only Fast Refresh
is not enough the first time. After installing dependencies:

```bash
cd ios && pod install && cd ..
npx expo run:android   # or: npx expo run:ios
```

The iOS `Podfile` already has `$MLRN.post_install(installer)` wired into the
`post_install` block (added when this feature was set up). Android needs no
extra config — just rebuild.

## 2. Get a MapTiler API key

The Bangkok offline tile pack is downloaded once (on first visit to the Map
Demo screen) from MapTiler's hosted styles.

1. Sign up for a free account at https://cloud.maptiler.com/
2. Go to **Account → Keys** and copy your API key.
3. Open `src/config/mapConfig.ts` and replace the placeholder:

```ts
export const MAPTILER_API_KEY = 'YOUR_MAPTILER_API_KEY';
```

with your real key.

## 3. First run vs. offline use

- **First launch of the Map Demo screen requires internet** — it downloads
  the Bangkok tile pack (`src/services/mapTiles.ts`, region defined by
  `BANGKOK_BOUNDS`, zoom levels `MAP_MIN_ZOOM`–`MAP_MAX_ZOOM`).
- After that first download completes, the map renders fully offline —
  panning is restricted to the Bangkok bounds (`maxBounds` on the `Camera`),
  so the user never pans into untiled blank areas.
- Mock project data (`src/services/projects.ts`) is seeded into AsyncStorage
  on first load, following the same offline-first pattern as the TVMaze
  shows data.

## 4. Expanding beyond Bangkok

To cover all of Thailand later, update `BANGKOK_BOUNDS` /
`BANGKOK_PACK_NAME` in `src/services/mapTiles.ts` to the new bounding box,
and bump `MAP_MAX_ZOOM`/`MAP_MIN_ZOOM` as needed. Note the tile pack size
grows quickly with zoom level and area — test incrementally.
