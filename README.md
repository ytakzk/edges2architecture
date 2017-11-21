## edges2architecture (still in progress)

This is an experimental project for developing photo realistic architecture from drawings. Architects develop their ideas from drawings. It is no exaggeration to say that drawing is the source of architecture. In general, the sketches are quite rough and conceptual because it takes a long time to draw detailed sketches. These days, they also use computers to represent their ideas with 3D CAD (computer-aided design) software instead of drawing by hand. As the name suggests, computers help us embody our ideas. However, they have to model the architecture in mind on computers, decide the texture, then render them. (The rendering sometimes takes more than 24 hours.)
This project aims to skip the process of drawing detailed illustration and modeling on computers. ‘edge2architecture’ will dramatically reduce the time to produce photo realistic architecture. It means that architects can concentrate on developing a creative concept. This is the genuine computer-aided design tool.

The model here is based on pix2pix and the training images are scraped from Pinterest.

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
