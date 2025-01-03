 #!/usr/bin/env zsh

# Set native display resolution to prevent shader artifacts.
# This is very specific to my 16" MacBook Pro.
#
# It is not required but if you normally set the display scaling to "More Space"
# which is not an even scaling, install through `brew install displayplacer` and
# find the display mode with `displayplacer list`.

# [ mode 54: res:1728x1117 hz:120 color_depth:8 scaling:on ]
/opt/homebrew/bin/displayplacer "id:1 mode:54"
