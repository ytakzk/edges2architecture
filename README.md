## edges2architecture (still in progress)

Architects develop their ideas from drawings. These days, they also create digital models with 3DCAD software to create more realistic images to express their idea before constructing.

This project is an experimental project for developing photo realistic architecture through drawing. The rough sketches become architecture.

The model is based on pix2pix and the training images are scraped from Pinterest.

## Setup

1. Run ```./download_model.sh``` to download the n2p model.
2. Run ```python app.py``` to launch the generator.
3. Run ```cd ./doc & python -m SimpleHTTPServer``` to launch the web client.
4. Open ```localhost:8000``` from any browser.

## Dependencies

- [PyTorch](http://pytorch.org/)
- ```pip install flask flask_cors dominate visdom```
- ```cd vision & python setup.py install```

## Pix2pix model

The generator is based on [CycleGAN-and-pix2pix-in-PyTorch](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix) by [junyanz](https://github.com/junyanz).

## Environments

- macOS 10.12.6
- Python 3.6.0

## Author
ytakzk  
 [https://ytakzk.me](https://ytakzk.me)
