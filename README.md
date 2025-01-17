# RetroArch Shortcut.app creator

Creates MacOS app bundles to launch roms directly through the Finder.

Requires [fzf](https://github.com/junegunn/fzf), [jq](https://jqlang.github.io/jq/) and [makeicns](http://www.amnoid.de/icns/makeicns.html).

```sh
brew install fzf jq makeicns
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
  --process-existing  re-process existing shortcuts in the output path

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

Process every game in all playlists grouped into folders named after the playlist.

```sh
for lpl in ~/Library/Application Support/RetroArch/playlists/*.lpl; do
  rashortcuts --process-all --playlist $lpl ~/Applications/RetroArch/$lpl:t:r
  # And if you have tag installed, apply Finder labels to tag it with the system
  # it runs under. `brew install tag` and uncomment the next line.
  # tag -a "${${lpl:t:r}// - /,}" $lpl:t:r/*.app
done
```

Or just cd to the directory where you want to create shortcuts and pick a playlist and games when prompted. Type to search and use `tab` or `ctrl+i` to select multiple items and press `return`. Use `ctrl+j/k` or the arrow keys to navigate. `esc` to cancel.

```sh
cd ~/Applications/RetroArch
rashortcuts
```
