#!/bin/bash

BIN_DIR=`dirname $0`

# check running from docroot
CURRENT_DIR=${PWD##*/}
if [ ! "$CURRENT_DIR" = "web" ]; then
  echo 'Please be sure that you are running this command from the web root.'
  exit 2
fi

chmod -R a+rwx sites/default/settings.php

drush si config_installer config_installer_sync_configure_form.sync_directory=../config/default --account-pass=admin --account-name="ilrweb admin" -y
