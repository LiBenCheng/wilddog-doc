#! /bin/sh
PRGDIR=`dirname "$0"`/../
cd "$PRGDIR"
PRGDIR=`cd $PRGDIR  >/dev/null; pwd `

rm -rf dist
mkdir dist

gulp build
cd dist
tar cvfz wilddog-doc.tar.gz *  --exclude=".*" --exclude=node_modules .