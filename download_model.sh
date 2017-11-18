#!/bin/sh

DIR=./pix2pix/checkpoints/n2p_pix2pix/
G_ID=175tL-gTcwCz6QC1qSJU2E53UkZS24y41
D_ID=1BbPoZZyc-MlQ7Z9MjfdXgHLIyW5Auhd5

echo $DIR
mkdir -p $DIR

curl -L "https://drive.google.com/uc?export=download&id=${D_ID}" -o $DIR"latest_net_D.pth"
curl -sc /tmp/cookie "https://drive.google.com/uc?export=download&id=${G_ID}" > /dev/null
CODE="$(awk '/_warning_/ {print $NF}' /tmp/cookie)"
curl -Lb /tmp/cookie "https://drive.google.com/uc?export=download&confirm=${CODE}&id=${G_ID}" -o $DIR"latest_net_G.pth"
