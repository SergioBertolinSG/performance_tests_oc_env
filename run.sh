#!/bin/bash

if [ $# -ne 1 ];
then
   echo "This script needs the owncloud core commit to run performance tests against it"
   exit
fi
COMMIT=$1
./install_owncloud.sh $COMMIT
./run_performance_tests.sh $COMMIT
