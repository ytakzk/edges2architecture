## nonparametric to parametric (still in progress)

Parametric design is a process based on algorithms using parameters and rules. Changing parameters or geometry generates different design and of course easily reproduce the same design through the same parameters. In other words, parameters are necessary to define any shapes.

Although parametric design is thought as a methodology to generate unprecedented shapes, the appearance of every parametric design is similar each other. Ironically, the possibility of parametric design that can generate any shape is limited for now. This project aims to reveal the situation and to show that the current parametric design can be generated from the old-fashion procedure of hand-writing.

This model can generate parametric design like images from drawing. The model is based on pix2pix, and the training images are scraped from Pinterest.

## Setup

1. Run ```./download_model.sh``` to download the n2p model.
2. Run ```python app.py``` to launch the generator.
3. Run ```cd ./doc & python -m SimpleHTTPServer``` to launch the web client.
4. Open ```localhost:8000``` from any browser.

## Pix2pix model

The generator is based on [https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix](CycleGAN-and-pix2pix-in-PyTorch) by [junyanz](https://github.com/junyanz)

## Environments

- macOS 10.12.6
- Python 3.6.0

## Author
ytakzk  
 [https://ytakzk.me](https://ytakzk.me)
