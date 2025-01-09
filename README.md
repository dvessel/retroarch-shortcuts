# RetroArch Shortcut.app creator

Creates MacOS app bundles to launch roms directly through the Finder.

Requires fzf, jq and makeicns

```sh
brew install fzf jq makeicns
```

```sh
usage: rashortcuts [OPTION]... [OUTPUT]

Playlists:
  --favorites
  --history
  -p, --playlist <path/to/playlist.lpl>

If a playlist is not provided, fzf will list them automatically.

Process without fzf game selection.
  --process-all           process all entries for a given playlist
  --process-existing      re-process existing shortcuts for a given output path

Last argument should point to the directory where the shortcut.app will be created.
Defaults to the current working directory.

Custom templates:
  --template <path/to/template>

An optional template for building shortcuts. It defaults to the folder named
"template" located in the same directory as this script.

```
