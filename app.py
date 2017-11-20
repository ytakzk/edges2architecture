 from flask import Flask, request
from flask_cors import CORS
import base64
import time
import transformer
from PIL import Image
import io

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"/generate/*": {"origins": "https://ytakzk.github.io/"}})

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/generate', methods=['POST'])
def generate():

    if not 'data' in request.form:
        abort(400)

    data  = request.form['data']
    model = request.form['model']
    print(model)
    now = str(int(time.time()))
    name = now + '.png'

    drawing_path      = './drawing/' + name
    combined_dir      = './datasets/' + now + '/'
    # transformed_path  = './transformed/' + name

    with open(drawing_path, 'wb') as f:

        f.write(base64.decodebytes(data.encode()))
        f.close()

        img = Image.open(drawing_path)

        transformer.createCombinedImage(img, combined_dir)
        result = transformer.run(combined_dir, model)
        transformed = Image.fromarray(result, 'RGB')

        output = io.BytesIO()
        transformed.save(output, format='png')
        im_data = output.getvalue()

        return base64.b64encode(im_data)

    return request.data

app.run(port=5005)
