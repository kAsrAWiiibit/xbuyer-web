#!/bin/sh
# Publica la rama actual en la vista previa (github.com/kAsrAWiiibit/xbuyer-web-preview, GitHub Pages desde
# main): build con noindex y robots.txt cerrado, y un único commit que sustituye al anterior.
# No toca el repositorio principal ni xbuyerteamacademy.com.
set -e
cd "$(dirname "$0")/.."
npm run vista-previa
REV=$(git rev-parse --short HEAD)
TMP=$(mktemp -d)
cp -R dist-vista-previa/. "$TMP"
cd "$TMP"
git init -q -b main
git add -A
git -c user.name="$(git -C "$OLDPWD" config user.name)" -c user.email="$(git -C "$OLDPWD" config user.email)" commit -qm "Vista previa de $(git -C "$OLDPWD" branch --show-current) ($REV)"
git push -qf https://github.com/kAsrAWiiibit/xbuyer-web-preview.git main
cd - >/dev/null
rm -rf "$TMP"
echo "Publicada: https://kasrawiiibit.github.io/xbuyer-web-preview/ ($REV)"
