import time
import os
from pix2pix.options.test_options import TestOptions
from pix2pix.data.data_loader import CreateDataLoader
from pix2pix.models.models import create_model
from pix2pix.util.visualizer import Visualizer
from pix2pix.util import html

import numpy as np
import time
from PIL import Image
import os

def run(dataroot, model_name):

    opt = TestOptions().parse()
    opt.name = model_name
    opt.dataroot = dataroot

    data_loader = CreateDataLoader(opt)
    dataset = data_loader.load_data()
    model = create_model(opt)
    visualizer = Visualizer(opt)

    # test
    for i, data in enumerate(dataset):
        if i >= opt.how_many:
            break
        model.set_input(data)
        model.test()
        visuals = model.get_current_visuals()
        img_path = model.get_image_paths()
        print('process image... %s' % img_path)
        result = visuals['fake_B']

        return result

def createCombinedImage(A, combined_dir):

    directory = combined_dir + 'test/'
    if not os.path.exists(directory):
        os.makedirs(directory)

    B = np.zeros_like(A)

    AB = np.concatenate((A, B), axis=1)

    im = Image.fromarray(np.uint8(AB))
    im.save(directory + 'AB.png')
