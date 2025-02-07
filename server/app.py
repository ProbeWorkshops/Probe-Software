from flask import Flask, request, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
import os
import jwt
import requests
import datetime
from flask_cors import CORS
from mlTrial import try_on_clothes

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure secret key for JWT
app.config['SECRET_KEY'] = 'your_secret_key'  # Change to a secure key

# Directory to store uploaded images
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Define Image Model
class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    image_type = db.Column(db.String(10), nullable=False)  # 'user' or 'dress'
    path = db.Column(db.String(200), nullable=True)  # File path
    url = db.Column(db.String(200), nullable=True)  # Optional: Image URL

# Create database tables
with app.app_context():
    db.create_all()

# Register User
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    username = data.get('username')
    name = data.get('name')
    password = data.get('password')

    if not email or not username or not name or not password:
        return jsonify({"message": "All fields are required"}), 400

    # Check if user already exists
    existing_user = User.query.filter((User.email == email) | (User.username == username)).first()
    if existing_user:
        return jsonify({"message": "User with this email or username already exists"}), 400

    hashed_password = generate_password_hash(password)

    new_user = User(email=email, username=username, name=name, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "status": 1})

# Login User
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # Check if user exists
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Verify password
    if not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid password"}), 401

    # Generate JWT token
    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
        app.config['SECRET_KEY'],
        algorithm="HS256"
    )

    return jsonify({"message": "Login successful", "token": token, "username": username}), 200

# Upload Image (Virtual Try-On)
@app.route('/upload', methods=['POST'])
def upload_image():
    user_id = request.form.get('user_id')

    # Define the upload directories
    person_dir = os.path.join(app.config['UPLOAD_FOLDER'], 'person')
    dress_dir = os.path.join(app.config['UPLOAD_FOLDER'], 'dress')

    # Create directories if they don't exist
    os.makedirs(person_dir, exist_ok=True)
    os.makedirs(dress_dir, exist_ok=True)

    # Get uploaded files
    person_file = request.files.get('person_image')
    dress_file = request.files.get('dress_image')

    if not person_file or not dress_file:
        return jsonify({"message": "Both person and dress images are required"}), 400

    # Save person image
    person_filename = secure_filename(person_file.filename)
    person_path = os.path.join(person_dir, person_filename)
    person_file.save(person_path)

    # Save dress image
    dress_filename = secure_filename(dress_file.filename)
    dress_path = os.path.join(dress_dir, dress_filename)
    dress_file.save(dress_path)

    # Call the Virtual Try-On API
    result_url = try_on_clothes(person_path, dress_path)
    print("ML Model Result URL:", result_url)

    # Download processed image from URL
    response = requests.get(result_url, stream=True)
    if response.status_code == 200:
        output_filename = os.path.basename(result_url)  
        output_dir = os.path.join(app.config['UPLOAD_FOLDER'], "output")
        os.makedirs(output_dir, exist_ok=True)

        output_path = os.path.join(output_dir, output_filename)

        # Save the processed image to the output folder
        with open(output_path, 'wb') as file:
            for chunk in response.iter_content(1024):
                file.write(chunk)

        print("Downloaded Image Saved At:", output_path)

        # Return the processed image file directly
        return send_file(output_path, mimetype='image/jpeg')

    return jsonify({"message": "Failed to download processed image"}), 500

if __name__ == '__main__':
    app.run(debug=True)
