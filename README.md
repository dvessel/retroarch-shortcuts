# RetroArch Shortcut.app creator

Creates MacOS app bundles to launch roms directly through the Finder.

Requires: [fzf](https://github.com/junegunn/fzf), [jq](https://jqlang.github.io/jq/).

```sh
brew install fzf jq
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

Last argument should point to the directory where the shortcut.app will be created.
Defaults to the current working directory.

Set CPU architectures:
  --force-arch        force the architecture to arm64 or x86_64 based on the core.
                      Runs independently of Rosetta mode set for RetroArch.

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
