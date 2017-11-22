#!/bin/sh

download () {
  echo $1
  mkdir -p $1

  curl -L "https://drive.google.com/uc?export=download&id=$2" -o $1"latest_net_D.pth"
  curl -sc /tmp/cookie "https://drive.google.com/uc?export=download&id=$3" > /dev/null
  CODE="$(awk '/_warning_/ {print $NF}' /tmp/cookie)"
  curl -Lb /tmp/cookie "https://drive.google.com/uc?export=download&confirm=${CODE}&id=$3" -o $1"latest_net_G.pth"
}

DIR=./pix2pix/checkpoints/$1/
echo $DIR
if [ "$1" = "oscar_pix2pix" ]; then
  D_ID=1hqiamYzgiEaMMznzR1aQeft6rnCmecOb
  G_ID=1fb-kf9QuiekY5RhVwt1eY7_8_ryOmy0x
elif [ "$1" = "oscar2_pix2pix" ]; then
  D_ID=1bz7-3hsKB6wS_-RPSeDqrdmkiO-14SoF
  G_ID=1IaV0oelKr0rp-G3U9slr33aCPJY_Id0n
elif [ "$1" = "gehry_pix2pix" ]; then
  D_ID=1KQDOlnmmHir0q87T9z8nBespiNPpPALz
  G_ID=1Eug6dPY0lyAfqmUnOsiNJpQVzdSgnDN5
fi;

download $DIR $D_ID $G_ID
