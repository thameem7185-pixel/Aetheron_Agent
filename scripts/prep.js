// Copies MediaPipe files into www/mediapipe so the app works offline (no CDN).
const fs = require('fs'), path = require('path');
const out = path.join(__dirname, '..', 'www', 'mediapipe');
fs.mkdirSync(out, { recursive: true });
for (const pkg of ['hands', 'drawing_utils']) {
  const dir = path.join(__dirname, '..', 'node_modules', '@mediapipe', pkg);
  for (const f of fs.readdirSync(dir)) {
    if (/\.(js|wasm|data|tflite|binarypb)$/.test(f) && !f.endsWith('.d.ts')) fs.copyFileSync(path.join(dir, f), path.join(out, f));
  }
}
console.log('MediaPipe files ready:', fs.readdirSync(out).join(', '));
