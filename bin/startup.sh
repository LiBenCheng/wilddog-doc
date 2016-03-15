#!/bin/bash

source /etc/profile

function help() {
        echo "Usage: $0 start|stop|restart"
}

PRGDIR=`dirname "$0"`/../
cd "$PRGDIR"
PRGDIR=`cd $PRGDIR  >/dev/null; pwd `

case $1 in
    stop)
        NODE_ENV=production forever stop $PRGDIR/bin/www
        exit 0
        ;;
    start)
        NODE_ENV=production forever start $PRGDIR/bin/www
        exit 0
        ;;
    restart)
        NODE_ENV=production forever restart $PRGDIR/bin/www
        exit 0
        ;;
    *)
        echo "Unknown Arguments."
        help
        ;;
esac