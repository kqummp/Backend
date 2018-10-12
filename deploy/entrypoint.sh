#!/bin/sh

APP=/app

mkdir -p $APP/log $APP/log/faillog $APP/log/reqlog

npm install

if [ ! -z "$DBHOST" ]; then
  sed -i "8d" $APP/config.json
  sed -i '7a \t"database_host" : "$DBHOST",' $APP/config.json
  sed -i "9d" $APP/node_modules/stdmgr/lib/usrmgr.js
  sed -i '8a const url = "mongodb://$DBHOST:27017";' $APP/node_modules/stdmgr/lib/usrmgr.js
  sed -i "9d" $APP/node_modules/tchmgr/lib/tchmgr.js
  sed -i '8a const url = "mongodb://$DBHOST:27017";' $APP/node_modules/tchmgr/lib/tchmgr.js
fi

if [ ! -z "$DBNAME" ]; then
  sed -i "9d" $APP/config.json
  sed -i '8a \t"database" : "$DBNAME",' $APP/config.json
fi

if [ ! -z "$REDISHOST" ]; then
  sed -i "5d" $APP/config.json
  sed -i '4a \t"redis_host" : "$REDISHOST",' $APP/config.json
fi

if [ ! -z "$LISTENADDR" ]; then
  sed -i "3d" $APP/config.json
  sed -i '2a \t"listen" : "$LISTENADDR",' $APP/config.json
fi

if [ ! -z "$LISTENPORT" ]; then
  sed -i "4d" $APP/config.json
  sed -i '3a \t"port" : $LISTENPORT,' $APP/config.json
fi

exec npm start
