# หลัง npm install แล้ว Metro รัน error: `@react-native-tvos/virtualized-lists` resolve ไม่ได้

อ่านไฟล์นี้เมื่อ:
- รัน `npm install` (หรือ `npm install --legacy-peer-deps`) ใหม่ แล้วแอป build/รันไม่ผ่าน
- หรือเจอ red screen บน emulator/simulator พร้อม error message ทำนองนี้:

```
Metro has encountered an error: While trying to resolve module
`@react-native-tvos/virtualized-lists` from file
.../node_modules/react-native/Libraries/Lists/FlatList.js,
the package .../node_modules/react-native/node_modules/@react-native-tvos/virtualized-lists/package.json
was successfully found. However, this package itself specifies a `main`
module field that could not be resolved (.../virtualized-lists/index)...
```

หรือ error คล้ายๆ กันที่บอกว่า resolve ไฟล์ใน `node_modules/react-native/node_modules/@react-native-tvos/virtualized-lists/...` ไม่เจอ ทั้งที่ไฟล์มีอยู่จริง

## Root Cause

มี 2 ชั้นซ้อนกัน:

1. **`@react-native-tvos/virtualized-lists` ไม่มี field `"main"` ใน package.json**
   แพ็กเกจนี้ (ฝังอยู่ใน `node_modules/react-native/node_modules/@react-native-tvos/virtualized-lists/`) ใช้ field `"exports"` แทน `"main"` แต่ Metro fallback ไปใช้ค่า default `main = "index"` แล้วพยายามหาไฟล์ `index.js`/`index.ts` ฯลฯ

2. **Watchman cache ค้าง (สาเหตุหลัก)**
   หลัง `npm install` มีไฟล์ใหม่ถูกเขียนเข้า `node_modules` แต่ Watchman watch ที่มีอยู่เดิมยังเป็น snapshot เก่า ทำให้ Metro/Watchman **มองว่าไฟล์ที่มีอยู่จริงบน disk ไม่มีอยู่** (`watchman find <path>` คืน `files: []` ทั้งที่ไฟล์อยู่จริง) → resolve `main`/relative import ไม่ได้ → เกิด error ด้านบน

## วิธีแก้ (ทำตามลำดับ)

### 1. Reset Watchman watch ให้ recrawl ใหม่ (แก้หลัก ทำก่อนเสมอ)

```bash
watchman watch-del /Users/pishetshotisak/Documents/sc/poc-react-native-tc
watchman watch-project /Users/pishetshotisak/Documents/sc/poc-react-native-tc
```

ไม่กระทบโค้ดหรือข้อมูลใดๆ แค่บังคับ Watchman สแกน filesystem ใหม่ทั้งหมด ปลอดภัย 100%

### 2. Patch `node_modules/react-native/node_modules/@react-native-tvos/virtualized-lists/package.json`

เพิ่ม field `"main"` เข้าไป (เช่น ต่อจาก `"bugs"`):

```json
"main": "index.js",
```

**สำคัญ:** ไฟล์นี้อยู่ใน `node_modules` ซึ่งไม่ได้ถูก track ใน git → **patch นี้จะหายไปทุกครั้งที่รัน `npm install` ใหม่** ต้องทำซ้ำขั้นนี้ทุกครั้งที่ปัญหากลับมา (ถ้าเกิดบ่อย ให้พิจารณาใช้ `patch-package` เพื่อให้ apply อัตโนมัติหลัง install — ยังไม่ได้ทำตอนนี้)

### 3. Restart Metro ด้วย `--reset-cache`

```bash
lsof -ti :8081 | xargs kill -9
npx react-native start --reset-cache
```

เพื่อล้าง in-memory dependency graph / haste map cache เก่าที่ค้าง resolve error เดิมไว้

### 4. Reload แอปบน emulator/simulator

```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
adb reverse tcp:8081 tcp:8081
adb shell am force-stop com.anonymous.mytvapp
adb shell am start -n com.anonymous.mytvapp/.MainActivity
```

## ผลกระทบ / ข้อควรระวัง

- ไม่มีการแก้ไขไฟล์โค้ดในโปรเจกต์ (`src/`, `metro.config.js`) สำหรับปัญหานี้ — เคยลองแก้ `metro.config.js` (`unstable_enablePackageExports: false`) แล้ว revert กลับ เพราะไม่ใช่สาเหตุจริง
- ปัญหานี้เป็น **environment issue (Watchman cache stale + node_modules ขาด field main)** ไม่ใช่บั๊กของโปรเจกต์ ดังนั้นไม่กระทบ behavior ของแอปหรือ build อื่นๆ
- ถ้า `npm install` ใหม่แล้ว error เดิมโผล่มาอีก → ทำซ้ำขั้นที่ 1–4 ด้านบน
