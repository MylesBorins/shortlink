#!/usr/bin/env bash
BASEDIR=$(dirname $0)
BIN_TEMPLATE=$BASEDIR/shortlink.sh
HTML_TEMPLATE=$BASEDIR/shortlink-template.html
URL=$1
if [ "$#" -le 0 ]; then
  echo "Error: please provide a url"
  exit 1
elif [ "$#" -eq 1 ]; then
  INSTALL_DIRECTORY=$HOME/.bin/
else
  INSTALL_DIRECTORY=$2
fi

mkdir -p $INSTALL_DIRECTORY

cp $HTML_TEMPLATE $INSTALL_DIRECTORY/shortlink-template.html
cat $BIN_TEMPLATE | sed 's@$BASE_URL@'"$URL"'@' > $INSTALL_DIRECTORY/shortlink

chmod 755 $INSTALL_DIRECTORY/shortlink
