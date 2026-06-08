#!/bin/bash
# Build web bundle สำหรับ Tizen / webOS
echo "Building web bundle..."
npx react-native bundle \
  --platform web \
  --dev false \
  --entry-file index.js \
  --bundle-output web-build/main.bundle.js \
  --assets-dest web-build/

echo "✅ Web build complete → web-build/"
echo ""
echo "Next steps:"
echo "  Tizen : Import web-build/ into Tizen Studio"
echo "  webOS : Package with ares-package web-build/"
