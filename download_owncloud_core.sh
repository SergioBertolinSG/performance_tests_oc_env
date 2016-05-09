#!/bin/bash

sudo rm -rf core
git clone https://github.com/owncloud/core.git
cd core
git submodule update --init --recursive
cd ..
sudo cp -r core "/var/www/html/oc_server"
