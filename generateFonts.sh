#!/bin/sh

OUTPUT_DIRECTORY="./public/static/fonts"

# Font families to download from fonts.google.com/download?family
FONT_FAMILIES=(
	"Roboto"
	"Roboto Mono"
)

# [lowercase-family/inputFilePath].ttf = OUTPUT_DIRECTORY/"output".woff2
declare -A FONT_STYLES=(

	[roboto/Roboto-Thin]="roboto-100"
	[roboto/Roboto-ThinItalic]="roboto-100i"
	[roboto/Roboto-Light]="roboto-300"
	[roboto/Roboto-LightItalic]="roboto-300i"
	# [roboto/Roboto-Regular]="roboto-400"
	# [roboto/Roboto-Italic]="roboto-400i"
	[roboto/Roboto-Medium]="roboto-500"
	[roboto/Roboto-MediumItalic]="roboto-500i"
	[roboto/Roboto-Bold]="roboto-700"
	[roboto/Roboto-BoldItalic]="roboto-700i"
	# [roboto/Roboto-Black]="roboto-900"
	# [roboto/Roboto-BlackItalic]="roboto-900i"

	# [roboto-mono/static/RobotoMono-Thin]="roboto_mono-100"
	# [roboto-mono/static/RobotoMono-ThinItalic]="roboto_mono-200i"
	# [roboto-mono/static/RobotoMono-ExtraLight]="roboto_mono-200"
	# [roboto-mono/static/RobotoMono-ExtraLightItalic]="roboto_mono-200i"
	[roboto-mono/static/RobotoMono-Light]="roboto_mono-300"
	# [roboto-mono/static/RobotoMono-LightItalic]="roboto_mono-300i"
	# [roboto-mono/static/RobotoMono-Regular]="roboto_mono-400"
	# [roboto-mono/static/RobotoMono-Italic]="roboto_mono-400i"
	# [roboto-mono/static/RobotoMono-Medium]="roboto_mono-500"
	# [roboto-mono/static/RobotoMono-MediumItalic]="roboto_mono-500i"
	# [roboto-mono/static/RobotoMono-SemiBold]="roboto_mono-600"
	# [roboto-mono/static/RobotoMono-SemiBoldItalic]="roboto_mono-600i"
	# [roboto-mono/static/RobotoMono-Bold]="roboto_mono-700"
	# [roboto-mono/static/RobotoMono-BoldItalic]="roboto_mono-700i"

)

function lowercase() {
	echo "$1" | sed "s/./\L&/g"
}

function downloadFont() {
	local file="/tmp/$(lowercase $(echo "$1" | sed "s/ /-/"))"
	wget "https://fonts.google.com/download?family=$(echo $1 | sed "s/ /%20/")" -O "$file.zip" >&2
	unzip -o "$file.zip" -d "$file" >&2
};

function generateWoff2() {
	echo "$1 >>> $2"
	woff2_compress "/tmp/$1.ttf"
	cp --verbose "/tmp/$1.woff2" "$OUTPUT_DIRECTORY/$2.woff2"
}

function cleanFont() {
	local file="/tmp/$(lowercase $(echo "$1" | sed "s/ /-/"))"
	rm -Rf "$file.zip" "$file"
}

mkdir -p public/static/fonts

for i in "${FONT_FAMILIES[@]}"
do
  downloadFont "$i"
done

for K in "${!FONT_STYLES[@]}"
do
	generateWoff2 $K ${FONT_STYLES[$K]}
done

for i in "${FONT_FAMILIES[@]}"
do
	cleanFont "$i"
done
