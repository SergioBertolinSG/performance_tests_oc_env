#!/bin/bash

sudo git clone https://github.com/owncloud/administration.git /opt/administration
sudo chown -R vagrant:vagrant /opt/administration
cd /opt/administration/performance-tests-c++
/opt/qt55/bin/qmake
make
