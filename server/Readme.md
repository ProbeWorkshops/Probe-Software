# Virtual Try-On Backend

This is the backend for the Virtual Try-On project, built using Flask. It handles user authentication, image uploads, and processes virtual try-on requests.

## Requirements

Make sure you have the following installed:

- Python (>=3.8)
- pip (Python package manager)
- SQLite (for database storage)

## Installation

1. **Clone the Repository**  
   ```sh
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Create a Virtual Environment (Recommended)**  
   ```sh
   python -m venv venv
   ```
   - Activate the environment:
     - **Windows:** `venv\Scripts\activate`
     - **Mac/Linux:** `source venv/bin/activate`

3. **Install Dependencies**  
   ```sh
   pip install -r requirements.txt
   ```

## Database Setup

1. Open a Python shell:
   ```sh
   python
   ```
2. Inside the shell, run:
   ```python
   from app import db
   db.create_all()
   exit()
   ```

## Configuration

- Set up your API key inside `mlTrial.py`:
  ```python
  "headers": {
      "x-rapidapi-key": "your_api_key_here",
      "x-rapidapi-host": "virtual-try-on2.p.rapidapi.com"
  }
  ```

## Running the Server

Start the Flask backend using:

```sh
python app.py
```

By default, the server runs on `http://127.0.0.1:5000/`.

## API Endpoints

### Register User

- **Endpoint:** `/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "username": "user123",
    "name": "John Doe",
    "password": "securepassword"
  }
  ```

### Login User

- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "user123",
    "password": "securepassword"
  }
  ```

### Upload Images

- **Endpoint:** `/upload`
- **Method:** `POST`
- **Form Data:**
  - `person_image`: Upload a user image
  - `dress_image`: Upload a clothing image

## Notes

- If using in **production**, update `SECRET_KEY` in `app.py`.
- Ensure `UPLOAD_FOLDER` exists with the correct permissions.
- Store sensitive information like API keys in environment variables.

## License

This project is open-source and can be modified as needed.

