from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app, resources=r'/api/*')

@app.route('/')
def hello_world():
    app.send_static_file('index.html')


@app.route('/api/test2', methods=['POST'])
def test2():
    from utils import base64URL_to_image, image_to_base64URL 
    
    # Decode query image sent by user
    image = base64URL_to_image(request.form.get('image'))
    value = request.form.get('value')
    
    # Extract fetures from query image

    # Search in database

    # Return results
    response_data = [{'image': image_to_base64URL(image), 'value': value} for i in range(50)]

    response = make_response(jsonify(response_data))
    response.headers['Content-Type'] = 'application/json'
    return response

if __name__ == '__main__':
    app.run(reload=True, debug=True)