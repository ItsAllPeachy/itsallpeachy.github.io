removeBuild() {
  workingDir="$HOME/building/pages-source"
  s2Dir="$workingDir/s2"
  buildDir="$s2Dir/dist"

  if [ -d "$buildDir" ]; then
    echo "Removing Previous Build Directory"
    if rm -r "$buildDir"; then
      echo "Previous Build Directory Removed"
    else
      echo "Failed to remove Previous Build Directory"
      return 1
    fi
  else
    echo "No Older Build Directories Found; Exiting"
    return 1
  fi
}
removeBuild
