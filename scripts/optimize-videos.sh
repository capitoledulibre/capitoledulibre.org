#!/usr/bin/env bash
set -euo pipefail

# Converts interview videos to:
# 1. WebM/VP9  (720p, ~1.5 Mbps) — modern browsers
# 2. MP4/H.264 (720p, ~2 Mbps)   — fallback
#
# Also generates a poster thumbnail (WebP).
#
# Usage: ./scripts/optimize-videos.sh [--force]
#   --force: re-encode even if output files exist

SRC_DIR="public/static/videos"
FORCE=false
[[ "${1:-}" == "--force" ]] && FORCE=true

# Video settings
WIDTH=1280
HEIGHT=720
CRF_VP9=33
CRF_H264=26

echo "🎬 Optimizing videos in ${SRC_DIR}/"
$FORCE && echo "   (--force: overwriting existing files)"

for src in "${SRC_DIR}"/itw-*.mp4; do
  [ -f "$src" ] || continue
  base=$(basename "$src" .mp4)

  webm="${SRC_DIR}/${base}.webm"
  mp4_opt="${SRC_DIR}/${base}-720p.mp4"
  poster="${SRC_DIR}/${base}-poster.jpg"

  echo ""
  echo "   Processing: ${base}.mp4"

  # Poster thumbnail (at 2 seconds, jpg then convert to webp via sharp later)
  if $FORCE || [ ! -f "$poster" ]; then
    echo "     → poster"
    ffmpeg -y -ss 2 -i "$src" -frames:v 1 -update 1 -vf "scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease" -q:v 5 "$poster" 2>/dev/null
  else
    echo "     · poster (exists)"
  fi

  # WebM/VP9 (two-pass for better quality/size ratio)
  if $FORCE || [ ! -f "$webm" ]; then
    echo "     → webm/vp9 (this takes a while...)"
    ffmpeg -y -i "$src" \
      -vf "scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease" \
      -c:v libvpx-vp9 -crf ${CRF_VP9} -b:v 0 -cpu-used 2 -row-mt 1 \
      -c:a libopus -b:a 128k \
      -threads 0 \
      "$webm" 2>/dev/null
    echo "     ✓ $(du -h "$webm" | cut -f1) "
  else
    echo "     · webm (exists)"
  fi

  # MP4/H.264 optimized (720p, lower bitrate)
  if $FORCE || [ ! -f "$mp4_opt" ]; then
    echo "     → mp4/h264 720p"
    ffmpeg -y -i "$src" \
      -vf "scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease" \
      -c:v libx264 -crf ${CRF_H264} -preset slow -movflags +faststart \
      -c:a aac -b:a 128k \
      "$mp4_opt" 2>/dev/null
    echo "     ✓ $(du -h "$mp4_opt" | cut -f1) "
  else
    echo "     · mp4 720p (exists)"
  fi
done

echo ""
echo "   📊 Size comparison:"
origsize=$(du -ch "${SRC_DIR}"/itw-*[!p].mp4 2>/dev/null | tail -1 | cut -f1)
webmsize=$(du -ch "${SRC_DIR}"/itw-*.webm 2>/dev/null | tail -1 | cut -f1)
mp4size=$(du -ch "${SRC_DIR}"/itw-*-720p.mp4 2>/dev/null | tail -1 | cut -f1)
echo "      Original (1080p H.264): ${origsize}"
echo "      WebM/VP9 (720p):        ${webmsize}"
echo "      MP4/H.264 (720p):       ${mp4size}"
echo ""
echo "   Done!"
