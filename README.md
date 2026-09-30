# Password & QR Generator — React

A React application for generating passwords, creating QR codes, and saving user-specific data through Firebase.

## Features
- Configurable 4–20 character password generation
- QR generation from passwords or custom text
- Firebase email/password authentication
- Personal saved-data dashboard
- Save and delete items by nickname
- Clipboard support and responsive dark-mode UI

## Stack
React, Vite, React Router, Firebase Authentication, Firestore, Netlify, and QR Server API.

## Local development
Install dependencies and run the Vite development server with `npm install` and `npm run dev`.

A Firebase project with Email/Password Authentication and Firestore is required.

## Security
Do not commit private credentials or service-account keys. Configure appropriate Firestore security rules for deployment.