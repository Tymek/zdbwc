mkdir -p public/static/fonts
wget https://fonts.google.com/download?family=Roboto -O /tmp/roboto.zip >&2
wget https://fonts.google.com/download?family=Roboto%20Mono -O /tmp/roboto-mono.zip >&2
unzip -o /tmp/roboto.zip -d /tmp/roboto >&2
unzip -o /tmp/roboto-mono.zip -d /tmp/roboto-mono >&2
woff2_compress /tmp/roboto/Roboto-Bold.ttf
woff2_compress /tmp/roboto/Roboto-Light.ttf
woff2_compress /tmp/roboto-mono/static/RobotoMono-Light.ttf
cp --verbose /tmp/roboto/Roboto-Bold.woff2 ./public/static/fonts/roboto-bold.woff2
cp --verbose /tmp/roboto/Roboto-Light.woff2 ./public/static/fonts/roboto-light.woff2
cp --verbose /tmp/roboto-mono/static/RobotoMono-Light.woff2 ./public/static/fonts/roboto-mono-light.woff2
