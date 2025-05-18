goLive() {
  workingDir="$HOME/building/pages-source"
  s1Dir="$workingDir/s1"
  s2Dir="$workingDir/s2"
  cacheDir="$workingDir/src4Man/.cache/cache.json"
  domain="itsallpeachy.surge.sh"
  echo "Navigating to $workingDir"
  cd "$workingDir" || {
    echo "Failed to cd into $workingDir"
    return 1
  }
  if ls | grep -q s2; then
    echo "Removing existing s2"
    rm -rf s2 || {
      echo "Failed to remove s2"
      return 1
    }
  else
    echo "No existing s2 to remove"
  fi
  echo "Copying s1 to s2"
  cp -r "$s1Dir" "$s2Dir" || {
    echo "Failed to copy s1 to s2"
    return 1
  }
  echo "Entering s2Dir"
  cd "$s2Dir" || {
    echo "Failed to enter s2Dir"
    return 1
  }
  echo "Running build..."
  if npm run build; then
    echo "Build successful, repositioning /src/ into /dist/..."
    if cp -r src dist; then
      echo "/src/ moved"
    fi
    echo "going live with surge"
    if surge dist/ $domain; then
      echo "Surge deployment successful"
      jq --arg domain "$domain" '.domain = $domain' "$cacheDir" >"${cacheDir}.tmp" && mv "${cacheDir}.tmp" "$cacheDir"
    else
      echo "Surge deployment failed"
    fi
  else
    echo "Build failed"
  fi
}
goLive
