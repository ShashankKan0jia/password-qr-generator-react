# Password & QR Generator (Full-Stack)

This is a full-stack web application that allows users to generate secure, random passwords and create QR codes. Users can create an account to save their generated passwords or custom data (like Wi-Fi credentials) with a nickname, view their saved data, and delete it.

\*\*Live Demo Link: https://password-qr-generator-shashankkanojia.netlify.app/

---

## Features

- **Password Generation:** Create cryptographically random passwords with custom criteria:
  - Custom length (4-20 characters)
  - Include uppercase letters
  - Include lowercase letters
  - Include numbers
  - Include symbols
- **QR Code Generation:**
  - Instantly generate a QR code from the generated password.
  - Generate a QR code from any custom text input.
- **User Authentication (Full-Stack):**
  - Users can register for a new account using Email & Password.
  - Secure login for existing users.
  - Session management (knows if you're logged in or out).
- **Personal Data Dashboard (Full-Stack):**
  - **Save Data:** Logged-in users can save any generated password or custom text with a unique **nickname**.
  - **View Data:** A "My Saved Data" button in the navbar toggles a list of all the user's saved data, displayed as `Nickname: Value`.
  - **Delete Data:** Users can delete any saved item individually.
- **Usability Features:**
  - Copy to clipboard button.
  - Smooth-scrolling information sections.
  - Fully responsive design with a dark mode theme.

---

## Tech Stack

This project was built by converting a static HTML/CSS/JS site into a modern full-stack application.

- **Frontend:**
  - **React:** A component-based library for building user interfaces.
  - **Vite:** A high-performance build tool for modern web development.
  - **React Router:** For handling client-side routing (`/`, `/login`, `/register`).
- **Backend (Backend-as-a-Service):**
  - **Firebase Authentication:** For managing user registration and login.
  - **Firestore Database:** A NoSQL database used to store all user-saved data.
- **Deployment:**
  - **Netlify:** For continuous deployment and hosting of the frontend.
- **External APIs:**
  - `api.qrserver.com`: Public API used to generate QR code images.

---

## Getting Started

To run this project on your local machine, follow these steps:

### 1. Prerequisite: Firebase Setup

This project **will not run** without a Firebase backend.

1.  Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2.  **Enable Authentication:** Go to **Build** > **Authentication** > **Sign-in method** and enable **Email/Password**.
3.  **Create Firestore Database:** Go to **Build** > **Firestore Database** > **Create database**. Start in **test mode** for development.
4.  **Get Your Keys:** Go to **Project Settings** > **General**. In the "Your apps" section, create a "Web app" (`</>`) and copy the `firebaseConfig` object.

### 2. Local Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ShashankKan0jia/password-qr-generator-react.git](https://github.com/ShashankKan0jia/password-qr-generator-react.git)
    cd password-qr-generator-react
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create the Firebase config file:**

    - In the `src/` folder, create a new file named `firebase.js`.
    - Paste the following code into it, replacing the `firebaseConfig` object with the one you copied from your own Firebase project.

    ```javascript
    // src/firebase.js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSy...",
      authDomain: "your-project-id.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project-id.appspot.com",
      messagingSenderId: "...",
      appId: "...",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

### 3. CRITICAL: Create Firestore Index

The query to fetch saved data requires a composite index.

1.  Go to your **Firestore Database** > **Indexes** tab.
2.  Click **Add Index**.
3.  Fill in the fields exactly as follows:
    - **Collection ID:** `savedData`
    - **Fields:**
      1.  `userId` (Mode: `Ascending`)
      2.  `createdAt` (Mode: `Descending`)
    - **Query Scopes:** `Collection`
4.  Click **Create** and wait for it to finish building.

### 4. Run the App

You're all set! Start the local development server.

```bash
npm run dev
```

My apologies. Here is the code for the README.md file.

Copy and paste everything inside the box below into your README.md file in VS Code.

Markdown

# Password & QR Generator (Full-Stack)

This is a full-stack web application that allows users to generate secure, random passwords and create QR codes. Users can create an account to save their generated passwords or custom data (like Wi-Fi credentials) with a nickname, view their saved data, and delete it.

**Live Demo Link:** [**https://your-site-name.netlify.app**](https://your-site-name.netlify.app)
_(Replace this with your actual Netlify link!)_

---

## Features

- **Password Generation:** Create cryptographically random passwords with custom criteria:
  - Custom length (4-20 characters)
  - Include uppercase letters
  - Include lowercase letters
  - Include numbers
  - Include symbols
- **QR Code Generation:**
  - Instantly generate a QR code from the generated password.
  - Generate a QR code from any custom text input.
- **User Authentication (Full-Stack):**
  - Users can register for a new account using Email & Password.
  - Secure login for existing users.
  - Session management (knows if you're logged in or out).
- **Personal Data Dashboard (Full-Stack):**
  - **Save Data:** Logged-in users can save any generated password or custom text with a unique **nickname**.
  - **View Data:** A "My Saved Data" button in the navbar toggles a list of all the user's saved data, displayed as `Nickname: Value`.
  - **Delete Data:** Users can delete any saved item individually.
- **Usability Features:**
  - Copy to clipboard button.
  - Smooth-scrolling information sections.
  - Fully responsive design with a dark mode theme.

---

## Tech Stack

This project was built by converting a static HTML/CSS/JS site into a modern full-stack application.

- **Frontend:**
  - **React:** A component-based library for building user interfaces.
  - **Vite:** A high-performance build tool for modern web development.
  - **React Router:** For handling client-side routing (`/`, `/login`, `/register`).
- **Backend (Backend-as-a-Service):**
  - **Firebase Authentication:** For managing user registration and login.
  - **Firestore Database:** A NoSQL database used to store all user-saved data.
- **Deployment:**
  - **Netlify:** For continuous deployment and hosting of the frontend.
- **External APIs:**
  - `api.qrserver.com`: Public API used to generate QR code images.

---

## Getting Started

To run this project on your local machine, follow these steps:

### 1. Prerequisite: Firebase Setup

This project **will not run** without a Firebase backend.

1.  Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2.  **Enable Authentication:** Go to **Build** > **Authentication** > **Sign-in method** and enable **Email/Password**.
3.  **Create Firestore Database:** Go to **Build** > **Firestore Database** > **Create database**. Start in **test mode** for development.
4.  **Get Your Keys:** Go to **Project Settings** > **General**. In the "Your apps" section, create a "Web app" (`</>`) and copy the `firebaseConfig` object.

### 2. Local Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ShashankKan0jia/password-qr-generator-react.git](https://github.com/ShashankKan0jia/password-qr-generator-react.git)
    cd password-qr-generator-react
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create the Firebase config file:**

    - In the `src/` folder, create a new file named `firebase.js`.
    - Paste the following code into it, replacing the `firebaseConfig` object with the one you copied from your own Firebase project.

    ```javascript
    // src/firebase.js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSy...",
      authDomain: "your-project-id.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project-id.appspot.com",
      messagingSenderId: "...",
      appId: "...",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

### 3. CRITICAL: Create Firestore Index

The query to fetch saved data requires a composite index.

1.  Go to your **Firestore Database** > **Indexes** tab.
2.  Click **Add Index**.
3.  Fill in the fields exactly as follows:
    - **Collection ID:** `savedData`
    - **Fields:**
      1.  `userId` (Mode: `Ascending`)
      2.  `createdAt` (Mode: `Descending`)
    - **Query Scopes:** `Collection`
4.  Click **Create** and wait for it to finish building.

### 4. Run the App

You're all set! Start the local development server.

```bash
npm run dev
The application will be available at http://localhost:5173/
```
