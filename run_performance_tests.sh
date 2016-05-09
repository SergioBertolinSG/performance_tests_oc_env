#!/bin/bash

if [ $# -ne 1 ];
then
   echo "This script needs the owncloud core commit which tests are running against"
   exit
fi
COMMIT=$1

PORT=8080
echo $PORT
sudo php -S localhost:$PORT -t /var/www/html/oc_server &
PHPPID=$!
echo "Process of the owncloud server: $PHPPID"

sleep 2

if [ ! -d /srv/performance_tests ]; then
    mkdir /srv/performance_tests
fi

currentTime=$(date +%Y-%m-%d.%H-%M-%S)

export DAV_USER=admin
export DAV_PASS=admin
echo "$DAV_USER : $DAV_PASS will run tests"
/opt/administration/performance-tests-c++/webdav-benchmark http://localhost:$PORT/remote.php/webdav/ -csv > /srv/performance_tests/"$currentTime"_"$COMMIT".csv

php /srv/tools/createFileMergingTestData.php $COMMIT $currentTime /srv/performance_tests/"$currentTime"_"$COMMIT".csv /srv/tools/stats_fake.json > /srv/performance_tests/"$currentTime"_"$COMMIT".json
rm /srv/performance_tests/"$currentTime"_"$COMMIT".csv

sudo kill $PHPPID
