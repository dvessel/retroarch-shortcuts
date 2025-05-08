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
  --process-existing  re-process existing shortcuts in the output path

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

## Warning!

Processing a large number of shortcuts outside of the Applications folder can delay its registration with *launch services*. This can cause an unending loop by nesessionmanager since it will detect the shortcut before it is registered. If the process `nehelper` endlessly takes up CPU time, it's because the shortcut has not been registered early enough. It will complain about the inability to cache UUID's.

To see a log while this is happening, run:

```sh
log stream --info --predicate 'senderImagePath contains[cd] "NetworkExtension"'
```

You can force shortcuts to register with launch services, giving nesessionmanager a chance to cache UUID's by running:

```sh
/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -R -f -v /path/to/shortcuts
```

The key `Architectures for arm64` must be removed from *com.apple.LaunchServices.plist* or it keep looping. Run the following command after `lsregister` has completed.

```sh
plutil -remove "Architectures for arm64" ~/Library/Preferences/com.apple.LaunchServices/com.apple.LaunchServices.plist
```

This is likely a MacOS bug (present as of 15.4.1). Ignore these instructions if `nehelper` is not taking excessive CPU time and the logs do not complain about caching UUID's.
