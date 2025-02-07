# Frontend Client Setup

This project is a React-based frontend application. Follow the steps below to set up and run the project.

## Prerequisites

Before starting, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or later)
- npm (comes with Node.js)

## File Structure

```
client/
├── node_modules/         # Dependencies
├── public/               # Static files
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # React components
│   │   ├── landing.css   # Styles for Landing.jsx
│   │   ├── Landing.jsx   # Landing page
│   │   ├── Navbar.css    # Styles for Navbar.jsx
│   │   ├── Navbar.jsx    # Navbar component
│   │   ├── SignIn.css    # Styles for SignIn.jsx
│   │   ├── SignIn.jsx    # Sign-in page
│   │   ├── SignUp.jsx    # Sign-up page
│   ├── App.css           # Global styles
│   ├── App.jsx           # Main React component
│   ├── index.css         # Index-specific styles
│   ├── main.jsx          # Entry point for React
├── .gitignore            # Files and folders to ignore in Git
├── package.json          # Project configuration
├── eslint.config.js      # Linting configuration
└── index.html            # HTML entry point
```

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install Dependencies**
   Use npm to install the required dependencies:
   ```bash
   npm install
   ```

3. **Start the Development Server**
   Run the development server using:
   ```bash
   npm run dev / npm start
   ```

4. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

   *(Note: The exact port may vary; check your terminal output for the correct address.)*

## Features

1. **Sign-In Page**
   - Allows users to sign in with email and password.
   - Displays success or error messages using `react-toastify`.

2. **Sign-Up Page**
   - Handles user registration with email, name, and password fields.
   - Redirects to the sign-in page after successful registration.

3. **Home Page**
   - Upload images for processing.
   - Displays previews of uploaded images.
   - Submits images to the backend for further processing.

4. **Navbar**
   - Includes navigation links to "Favorite" and logout.

## Scripts

- **Start Development Server**
  ```bash
  npm run dev
  ```

- **Build for Production**
  ```bash
  npm run build
  ```

- **Lint Code**
  ```bash
  npm run lint
  ```

## Dependencies

Key libraries used in this project:
- React (`react`, `react-dom`)
- React Router (`react-router-dom`)
- Axios (for API calls)
- React Toastify (for notifications)

## Backend Integration

This frontend interacts with a Flask backend. Make sure your backend server is running and configured to handle requests from this frontend.

- **Backend Base URL**: `http://127.0.0.1:5000`

## Contribution

Feel free to fork this repository and contribute. Follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Open a pull request.

---

Enjoy coding! 🚀

