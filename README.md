# Hospital Management System

Hospital Management System is a full-stack web application built as part of a Full Stack Developer technical assessment. It provides secure admin access and a clean interface for managing patients, doctors, and appointments with conflict-safe booking logic.

## Key Features

- Admin login with JWT-based authentication
- Patient management with create, read, update, and delete operations
- Doctor management with create, read, update, and delete operations
- Appointment booking with date and time support
- Conflict prevention to avoid double booking for the same doctor and time slot
- Dashboard view for patients and appointments
- Responsive UI with a clear, production-ready layout

## Tech Stack

### Frontend

- React (Vite)
- Axios
- CSS

### Backend

- Spring Boot
- Spring Security with JWT
- Spring Data JPA

### Database

- PostgreSQL on Render

## Project Structure

```text
Patient_Management_System/
├── hospital-management/
└── hospital-frontend/
```

## Live Demo

Frontend: https://patient-management-system-pearl.vercel.app

Backend: https://patient-management-system-1cc1.onrender.com

## Demo Credentials

- Username: admin
- Password: admin123

## Setup Instructions

### Backend Setup

1. Open the `hospital-management` folder.
2. Configure your PostgreSQL connection in `src/main/resources/application.properties`.
3. Update any required JWT or database properties for your local environment.
4. Run the backend:

```bash
cd hospital-management
mvn spring-boot:run
```

### Frontend Setup

1. Open the `hospital-frontend` folder.
2. Install dependencies:

```bash
cd hospital-frontend
npm install
```

3. Start the development server:

```bash
npm run dev
```

## API Endpoints Overview

- `POST /auth/login`
- `GET /patients`, `POST /patients`, `PUT /patients/{id}`, `DELETE /patients/{id}`
- `GET /doctors`, `POST /doctors`, `PUT /doctors/{id}`, `DELETE /doctors/{id}`
- `GET /appointments`, `POST /appointments`, `PUT /appointments/{id}`, `DELETE /appointments/{id}`

## Screenshots

Add screenshot here: Login Page

Add screenshot here: Dashboard

Add screenshot here: Patients Management

Add screenshot here: Doctors Management

Add screenshot here: Appointments Management

## Highlights / Notes

- JWT-based authentication for protected routes
- Appointment conflict prevention to avoid double booking
- Full-stack deployment with Render and Vercel
- Responsive UI for a clean user experience

## Conclusion

This project was built as part of a technical assessment to demonstrate full-stack development skills across frontend, backend, authentication, API design, and deployment.