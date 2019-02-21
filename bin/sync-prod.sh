#!/bin/bash

cd `git rev-parse --show-toplevel`

# download the prod db
./vendor/bin/drush sql:sync @ilrbrand.master @ilrbrand._local --structure-tables-list=cache,cache_* -y
./vendor/bin/drush cr
./vendor/bin/drush sql:sanitize -y
./vendor/bin/drush uli

# check whether to keep the prod config in place
while :; do
  case $1 in
    -c|--config) CONFIG="YES"
    ;;
    *) break
  esac
  shift
done

if [ "$CONFIG" != "YES" ]; then
  # import local config
  ./vendor/bin/drush cim -y
  ./vendor/bin/drush csim -y
fi

echo "Sync complete."
