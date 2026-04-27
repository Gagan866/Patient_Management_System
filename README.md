# Hospital Management System

A full-stack web application for managing patients, doctors, and appointments in a hospital workflow.

Built with Spring Boot, React (Vite), and PostgreSQL.

## Features

- Admin login with JWT authentication
- Patient management (Create, Read, Update, Delete)
- Doctor management (Create, Read, Update, Delete)
- Appointment booking with conflict prevention (prevents double-booking the same doctor slot)
- Dashboard overview for patients and appointments

## Tech Stack

### Frontend

- React (Vite)
- Axios
- CSS

### Backend

- Spring Boot
- Spring Security (JWT)
- Spring Data JPA

### Database

- PostgreSQL

## Project Structure

```text
Patient_Management_System/
├── hospital-management/   # Spring Boot backend
└── hospital-frontend/     # React frontend
```

## Setup Instructions

### Prerequisites

- Java 21+
- Maven
- Node.js 18+
- PostgreSQL

### 1. Backend Setup

From the backend directory:

```bash
cd hospital-management
mvn spring-boot:run
```

Notes:

- Configure PostgreSQL connection in `hospital-management/src/main/resources/application.properties`
- Default backend port: `8080`

### 2. Frontend Setup

From the frontend directory:

```bash
cd hospital-frontend
npm install
npm run dev
```

Notes:

- Default frontend dev port: `5173`
- Frontend expects backend API at `http://localhost:8080`

## API Endpoints (Brief)

### Auth

- `POST /auth/login` - login and receive JWT

### Patients

- `GET /patients`
- `POST /patients`
- `PUT /patients/{id}`
- `DELETE /patients/{id}`

### Doctors

- `GET /doctors`
- `POST /doctors`
- `PUT /doctors/{id}`
- `DELETE /doctors/{id}`

### Appointments

- `GET /appointments`
- `POST /appointments`
- `PUT /appointments/{id}`
- `DELETE /appointments/{id}`

## Screenshots

Add project screenshots here after capturing UI views.

- Login Page: _Screenshot coming soon_
- Dashboard: _Screenshot coming soon_
- Patients Management: _Screenshot coming soon_
- Doctors Management: _Screenshot coming soon_
- Appointments Management: _Screenshot coming soon_

## Live URL

To be added after deployment.

## License

This project is for educational and learning purposes.