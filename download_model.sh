#!/bin/sh

download () {
  echo $1
  mkdir -p $1

  curl -L "https://drive.google.com/uc?export=download&id=$2" -o $1"latest_net_D.pth"
  curl -sc /tmp/cookie "https://drive.google.com/uc?export=download&id=$3" > /dev/null
  CODE="$(awk '/_warning_/ {print $NF}' /tmp/cookie)"
  curl -Lb /tmp/cookie "https://drive.google.com/uc?export=download&confirm=${CODE}&id=$3" -o $1"latest_net_G.pth"
}

DIR=./pix2pix/checkpoints/edges2architecture_pix2pix/
D_ID=1hqiamYzgiEaMMznzR1aQeft6rnCmecOb
G_ID=1fb-kf9QuiekY5RhVwt1eY7_8_ryOmy0x

download $DIR $D_ID $G_ID
