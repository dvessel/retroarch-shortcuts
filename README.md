# RetroArch Shortcut.app creator

Creates MacOS app bundles to launch roms directly through the Finder.

Requires: [fzf](https://github.com/junegunn/fzf), [jq](https://jqlang.github.io/jq/) and [fileicon](https://github.com/mklement0/fileicon) if you are running MacOS 26 (Tahoe or later).

With [homebrew](https://brew.sh) installed, get the required dependencies.
```sh
brew install fzf jq fileicon
```

```
usage: rashortcuts [OPTION]... [OUTPUT]

Playlists:
  --favorites         favorites playlist
  --history           history playlist
  -p, --playlist      path/to/playlist.lpl

If a playlist is not provided, fzf will list them automatically.

Process without fzf game selection.
  --process-all       process all entries for a given playlist
  --process-existing  process entries for a given playlist that already exists in
                      the output directory.

Last argument should point to the directory where the shortcut.app will be created.
Defaults to the current working directory.

Custom templates:
  -t, --template      path/to/template-folder

An optional template for building shortcuts. It defaults to the folder named
"template" located in the same directory as this script.

  -h, --help          view help.

```

## Example usage:

Process all favorites. Last argument *(optional)* is the output path.

```sh
rashortcuts --favorites --process-all ~/Applications/RetroArch/Favorites
```

Or just cd to the directory where you want to create shortcuts and pick a playlist and games when prompted. Type to search and use `tab` or `ctrl+i` to select multiple items and press `return`. Use `ctrl+j/k` or the arrow keys to navigate. `esc` to cancel.

```sh
cd ~/Applications/RetroArch
rashortcuts
```

## Tips:

- The script depends on existing playlists with valid entries and boxart for the app icon. The app icon will fall back to the assets within `xmb/retrosystem`.
- If you have a large collection of games, avoid to process too many of them. I'm not sure why but MacOS can fall into a loop processing them which will eat CPU time and it doesn't go away until the shortcuts are deleted.
