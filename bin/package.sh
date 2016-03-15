#! /bin/bash
PRGDIR=`dirname "$0"`/../
cd "$PRGDIR"
PRGDIR=`cd $PRGDIR  >/dev/null; pwd `

rm -rf dist
mkdir dist

chmod a+x node_modules -R
gulp build
cd dist
tar cvfz wilddog-doc.tar.gz *  --exclude=".*" --exclude=node_modules .