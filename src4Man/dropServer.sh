dropServer() {
  workingDir="$HOME/building/pages-source/src4Man"

  cacheFile="$workingDir/.cache/cache.json"
  domain=$(jq -r '.domain' $cacheFile)
  surge teardown $domain
}
dropServer
