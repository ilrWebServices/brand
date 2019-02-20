#!/bin/bash

# remove the local db
drush sql-drop -y

# download the prod db
drush sql-sync @ilrbrand.master @ilrbrand._local --structure-tables-list=cache,cache_* -y

drush cr

drush sql:sanitize -y

drush uli

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
  drush cim -y
  drush csim -y
fi

echo "Sync complete."
