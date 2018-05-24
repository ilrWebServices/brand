#!/bin/bash

# download the prod db
drush @ilrbrand.master sql:dump --structure-tables-list=cache,cache_* > db/dump.sql

# import to lando
lando db-import db/dump.sql

lando drush cr

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
  lando drush cim -y
  lando drush csim -y
fi

echo "Sync complete."
