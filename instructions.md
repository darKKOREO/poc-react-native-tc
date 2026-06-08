# Debugging with Reactotron

## 1. Install the Reactotron Desktop App

Download the latest `.dmg` from:
https://github.com/infinitered/reactotron/releases

Open the `.dmg` and drag Reactotron to Applications. Launch it.

The npm package (`reactotron-react-native`) is already installed in this project.

---

## 2. Start the App

Make sure the Android TV emulator is running, then:

```bash
npx expo start
```

Press `a` to open the app on the Android emulator (or run `npx expo run:android` for a full rebuild if needed).

---

## 3. Verify Connection

Once the app launches, Reactotron desktop will show the device in the sidebar with a green dot. You should see a `CONNECTION` entry in the Timeline.

If the device does not appear:
- Make sure Reactotron desktop is open **before** the app starts
- The Android emulator reaches your Mac at `10.0.2.2` (already configured in `src/utils/reactotron.ts`) — no extra `adb reverse` needed

---

## 4. View Logs (Timeline)

All `console.log` calls from the app appear in Reactotron's **Timeline** tab automatically.

To log structured data from anywhere in the code:

```ts
import Reactotron from '../utils/reactotron';
Reactotron.display({ name: 'My Label', value: { foo: 'bar' }, preview: 'short summary' });
```

---

## 5. View Network Requests (Timeline)

> **Note:** Reactotron's built-in Network tab does not capture requests in this project because React Native 0.85 + Hermes implements `fetch` natively, bypassing the XHR interceptor that Reactotron relies on.

Network requests are instead logged manually to the Timeline via `Reactotron.display()` inside `src/services/api.ts`.

When you press **Sync Data** on the Welcome screen, two entries appear in the Timeline:

| Entry | What it shows |
|-------|--------------|
| `→ REQUEST` | HTTP method and URL |
| `← RESPONSE` | Status code and item count |

To add network logging to a new API call, follow the same pattern in `src/services/api.ts`:

```ts
const url = 'https://example.com/api/data';
tron('→ REQUEST', { method: 'GET', url }, `GET ${url}`);

const { data, status } = await axios.get(url);
tron('← RESPONSE', { status, count: data.length }, `${status} — ${data.length} items`);
```

---

## 6. Filter and Search the Timeline

- Use the **search bar** at the top of the Timeline to filter by label name (e.g. `REQUEST`, `RESPONSE`)
- Click any entry to expand and see the full value object
- Click the trash icon to clear the timeline between test runs

---

## 7. Common Issues

| Problem | Fix |
|---------|-----|
| Device not connecting | Open Reactotron before starting the app |
| No logs appearing | Make sure you are in development mode (`npx expo start`, not a release build) |
| App crashes on start | The `if (__DEV__) require('./src/utils/reactotron')` guard in `App.tsx` ensures Reactotron only loads in dev — if you see import errors, check that `reactotron-react-native` is installed (`npm install`) |
| Network tab is empty | Expected — see Section 5 above |
