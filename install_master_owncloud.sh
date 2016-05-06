sudo rm -rf core
git clone https://github.com/owncloud/core.git
cd core
git submodule update --init --recursive
cd ..
fecha=`date +%d-%m-%y`
sudo cp -r core "/var/www/html/master_$fecha"
sudo chown -R www-data:www-data "/var/www/html/master_$fecha"

