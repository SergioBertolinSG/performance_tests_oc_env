#!/bin/bash

if [ $# -ne 1 ];
then
   echo "This script needs the owncloud core commit to install it"
   exit
fi
COMMIT=$1

#CLEAN ANY PREVIOUS INSTALLATION
python clean_database.py
sudo rm -rf /var/www/html/oc_server/config/config.php /var/www/html/oc_server/data/*

currentTime=$(date +%Y-%m-%d.%H-%M-%S)

echo "$(date '+%Y-%m-%d %H-%M-%S') Checking out commit $1 ..."

cd /var/www/html/oc_server
sudo git fetch -q
sudo git checkout -q $1 || exit 1
sudo git submodule update

sudo chown -R www-data:www-data "/var/www/html/oc_server"

echo "$(date '+%Y-%m-%d %H-%M-%S') Install owncloud ..."
sudo -u www-data php occ maintenance:install --admin-pass=admin --database=mysql --database-name=owncloud --database-user=root --database-pass=''