#!/usr/bin/env zsh

path+=$contents/Scripts/screens

# rascreen not instantly available after launching RetroArch.
while pgrep -x RetroArch &> /dev/null; do
  if serial=`rascreen --serial`; then
    break
  else
    sleep 1
  fi
done

# TODO: Reads frontend log for emulated fps info. a bit hackish but so is
# everything else. If the fps is never emitted, tail will linger forever and the
# shortcut will fail on subsequent launches. It's stable for now but find an
# alternative. The shortcut also provides a config override for logging.
if type screen-$serial &>/dev/null; then
  tail -fn200 ${TMPDIR}libretro-log/retroarch.log |
  sed -lEn 's/^\[INFO\] \[Core\] Geometry:.*FPS: ([0-9]+.[0-9]+).*/\1/p' |
  while read hwhz; do
    if hz=`screen-$serial $hwhz`; then
      # rascreen exits when RetroArch exits. Launch into the background.
      rascreen --set-hz $hz &
      pkill -f "tail -fn200 ${TMPDIR}libretro-log/retroarch.log"
    fi
  done
fi
