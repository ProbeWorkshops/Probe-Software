# Full-Stack Project Overview

This is a full-stack web application consisting of a **React.js frontend** and a **Flask backend**. The application is designed to provide a seamless user experience by integrating dynamic frontend features with a robust backend API.

The project is based on the concept of **virtual try-in**, enabling users to upload images of human models and clothing items to visualize how they pair together. This modern solution is designed to enhance user experiences in online shopping or styling applications.

---

## Project Overview

- **Frontend**:
  - Built using **React.js** for a responsive and interactive user interface.
  - Features include:
    - User authentication (Sign Up and Sign In).
    - File upload functionality for human and clothing images.
    - Image previews to allow users to view their uploads in real time.
    - Navigation with a clean and modern UI for better usability.
  - The frontend is located in the `client` folder.

- **Backend**:
  - Developed using **Flask**, a lightweight and efficient web framework.
  - Provides RESTful APIs to handle:
    - User authentication and session management.
    - File upload handling and image processing logic.
  - The backend is located in the `backend` folder.

---

## Virtual Try-In Overview

The virtual try-in feature is designed to simulate how clothing might look on a human model. Users can:
- **Upload Images**:
  - Provide an image of themselves (or a human model) and an image of a clothing item.
- **Preview Results**:
  - View the uploaded images to ensure they meet their expectations before further processing.
- This feature provides a foundation for potential future extensions, such as automated image overlaying, AI-powered fit recommendations, or enhanced visualization tools for e-commerce applications.

---

## How to Get Started

1. Navigate to the respective directories for the **frontend** and **backend**:
   - For the frontend: `cd client`
   - For the backend: `cd backend`

2. Follow the detailed instructions in the `README.md` files located in each folder to set up and run the respective parts of the application.

---

## Key Features

- **User Authentication**:
  - Sign Up: Create a new account.
  - Sign In: Secure login using email and password.

- **Image Handling**:
  - Upload human and clothing images.
  - Display image previews before further processing.

- **Virtual Try-In**:
  - Core functionality to enhance online shopping experiences.

- **Responsive Design**:
  - The frontend UI is designed to work seamlessly across devices and screen sizes.

---

## Technologies Used

- **Frontend**: React.js, Axios, React Router, React Toastify
- **Backend**: Flask, SQLite
- **Styling**: CSS with modular stylesheets
- **Tools**: npm, Python, Virtual Environment

---

For detailed setup instructions, refer to the `README.md` files in the respective folders.
