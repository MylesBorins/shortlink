#!/usr/bin/env bash
BASEDIR=$(dirname $0)
TEMPLATE=$BASEDIR/shortlink-template.html
URL=$1
if [ "$#" -le 0 ]; then
  echo "Error: please provide a url"
  exit 1
elif [ "$#" -eq 1 ]; then
  SHA="$(echo -n $URL | shasum | cut -c1-8)"
else
  SHA=$2
fi

mkdir -p $TMPDIR/$SHA
cat $TEMPLATE | sed 's@$URL@'"$URL"'@' > $TMPDIR/$SHA/index.html

gsutil rsync $TMPDIR/$SHA gs://$BASE_URL/$SHA

echo https://$BASE_URL/$SHA
