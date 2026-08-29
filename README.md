# RetroArch Shortcut.app creator

Creates MacOS app bundles to launch roms directly through the Finder.

## Installation

Requires: [fzf](https://github.com/junegunn/fzf), [oq](https://blacksmoke16.github.io/oq/) and [fileicon](https://github.com/mklement0/fileicon) *if you are running macOS 26 (Tahoe or later)*.

`oq` is a [jq](https://jqlang.github.io/jq/) wrapper that can also handle xml files which is required for arcade roms. Standalone [MAME](https://www.mamedev.org) is also required when handling arcade roms for its xml output. If mame roms are not being handled, `jq` can be used instead.

`fileicon` required in macOS 26 and later do to the application icon restrictions preventing full artwork presented.

With [homebrew](https://brew.sh) installed, get the required dependencies. *omit `mame` if you are not using arcade roms*:

```sh
brew install fzf oq mame fileicon
```

## Usage

```
usage: rashortcuts [OPTION]... [OUTPUT]

Playlists:
  --favorites         favorites playlist
  --history           history playlist
  -p, --playlist      path/to/playlist.lpl

If a playlist is not provided, fzf will list them automatically.

Process without fzf game selection.
  --process-all       Process all entries for a given playlist
  --process-existing  Process entries for a given playlist that already exists in
                      the output directory. Useful for updating existing shortcuts.

Containment mode:
  --link              Core and game files are symlinked. (default)
                      For use when the shortcut is already self-contained to
                      force it into symbolic links.
  --self-contain      Copy the core and game files into the shortcut.

Custom templates:
  -t, --template      path/to/template-folder

An optional template for building shortcuts. It defaults to the folder named
"template" located in the same directory as this script. If a hidden .template
folder exists in the output directory, it will be used instead but --template
will always take presidence.

Last argument should point to the directory where the shortcut.app will be created.
Defaults to the current working directory.

  -h, --help          View help.
```

## Example usage:

Process all favorites. Last argument *(optional)* is the output path.

```sh
rashortcuts --favorites --process-all /Applications/RetroArch/Favorites
```

Or call it with a path and pick a playlist and games when prompted. Type to search and use `tab` or `ctrl+i` to select multiple items and press `return`. Use `ctrl+j/k` or the arrow keys to navigate. `esc` to cancel.

```sh
rashortcuts ~/RetroArch\ Shortcuts
```

## Notes:

- Output directory must be writable. If it doesn't exist, it will be created.
- The script depends on existing playlists with valid entries and boxart for the app icon. The app icon will fall back to the assets within `xmb/retrosystem`.
- Using `--process-existing` is primarily meant to update existing shortcuts but it depends on the label in the playlist not being changed.
