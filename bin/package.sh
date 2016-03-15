#! /bin/sh
PRG="$0"
while [ -h "$PRG" ]; do
      ls=`ls -ld "$PRG"`
      link=`expr "$ls" : '.*-> \(.*\)$'`
      if expr "$link" : '/.*' > /dev/null; then
        PRG="$link"
      else
        PRG=`dirname "$PRG"`/"$link"
      fi
done

PRGDIR=`dirname "$PRG"` && PRGDIR=`cd "$PRGDIR" >/dev/null; pwd`

# go project basePath
cd "$PRGDIR/.."

rm -rf dist
mkdir -p dist

tar cvfz dist/wilddog-doc.tar.gz *  --exclude=".*" --exclude=node_modules --exclude=dist .