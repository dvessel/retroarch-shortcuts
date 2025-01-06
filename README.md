# RetroArch Shortcut.app creator

Creates MacOS app bundles to launch roms directly through the Finder.

Requires fzf, jq and makeicns

```sh
brew install fzf jq makeicns
```

```sh
Usage:

Last argument should point to the directory where the shortcut.app will be created.
Defaults to the current working directory.

will process without fzf select mode.
  --process-all
  --process-existing  This will only overwrite existing shortcuts.

Playlists:
  --favorites
  --history
  -p, --playlist <path/to/playlist.lpl>

If no playlist argument is passed, fzf will list all of your playlists.
```
