A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that streamlines the management of appointments, diagnosis, patient history, and medical records for healthcare professionals and patients.
🚀 Features
👨‍⚕️ Frontend (React.js + Vite)

    Dashboard: Quick access to appointments, diagnosis forms, and notifications.

    Appointment Management: View patient details, slots, and trigger diagnosis.

    Diagnosis Form: Enter patient symptoms, prescriptions, and treatment notes.

    Patient History Viewer: View patient medical history, allergies, ongoing medications, and emergency contacts.

🛠️ Backend (Node.js + Express.js)

    RESTful APIs: For appointment scheduling, diagnosis logging, and patient data retrieval.

    Middleware: Error handling, logging, and CORS integration.

    Authentication (optional): Add JWT for protected routes.

🗄️ Database (MongoDB)

    Stores structured records of patients, appointments, prescriptions, and history with a flexible schema design.

    📁 Folder Structure

/public
  └── static assets (images, index.html)
  
/src
  ├── components/
  ├── pages/
  ├── services/ (API handlers via Axios)
  ├── utils/
  └── App.jsx, main.jsx, etc.

/server
  ├── models/
  ├── routes/
  ├── controllers/
  └── index.js

🧰 Tech Stack

    Frontend: React.js, Vite, JavaScript (ES6+), Axios, HTML5, CSS3, ESLint

    Backend: Node.js, Express.js

    Database: MongoDB (Mongoose ODM)

    Dev Tools: VS Code, Chrome DevTools, Postman

🖥️ Installation

    Clone the repo

git clone https://github.com/debolina-d/-Full-Stack-Web-Application-for-Online-Medical-Consultations-Using-MERN.git

cd doctor-patient-management

Install frontend dependencies

cd client
npm install

Install backend dependencies

cd ../server
npm install

Environment setup
Create a .env file in /server with:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Run the app

# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
