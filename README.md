# GestureRelay (APK + ESP32)

## 1. Flash the ESP32
Open `firmware/GestureRelay/GestureRelay.ino` in Arduino IDE (ESP32 board package), upload.
Relays: GPIO26 / GPIO27 (`ACTIVE_LOW = true`). No extra libraries needed.

## 2. Build the APK on GitHub
1. Create a repo, upload everything in this folder (keep the `.github` folder).
2. Push to `main`. Actions -> "Build APK" runs (about 5-8 min).
3. Open the finished run -> Artifacts -> `GestureRelay-apk` -> unzip -> install `app-debug.apk`.
(Run manually any time: Actions -> Build APK -> Run workflow.)

## 3. First-time setup
1. Phone/Chromebook: join Wi-Fi `GestureRelay` (password `12345678`).
2. Open the app -> address `192.168.4.1` -> PING.
3. "ESP32 Wi-Fi Setup": Scan, pick router, password, optional fixed IP -> Save & Connect.
4. A "Configured" pop-up shows the router IP. Settings are stored on the ESP32 (survive reboot).
5. Put the ESP32 aside. Connect your device to the router and press Auto-find (or enter the router IP / gesturerelay.local).

The ESP32 keeps its own `GestureRelay` network (192.168.4.1) running at all times, so you can always change the router again.

## Controls
- Gestures (camera): palm = R1 ON, fist = R1 OFF, point = R2 ON, peace = R2 OFF
- Voice: "relay one on", "relay two off", "all off", "light 2 on"
