#!/bin/sh

while true
do
	echo "Heart beat:"
	date
	aa=`ps -aux|grep app.js|wc -l`
	if [ "$aa" == 1 ]; then
	  echo "Nodejs not running, starting Node..."
	  node ~/git/trebuchet/express/app.js &
	  echo "Nodejs started"
	else
	  echo "Nodejs is already running"
	fi
	sleep 60
done