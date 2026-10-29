# Digipeddle — Enquiry Management System

A full-stack MERN application featuring a modern homepage, a two-step customer enquiry form, MongoDB data storage, and an admin dashboard for searching and managing submitted enquiries.

## Features

### Homepage and Enquiry Form

- Responsive homepage UI.
- Two-step enquiry submission process.
- Customer name, email, and mobile number validation.
- Service selection, budget selection, and project description.
- Form validation and submission feedback.
- Preserves entered information when navigating between steps.
- Prevents accidental repeated submissions on the frontend.

### Admin Dashboard

- Admin-key-protected enquiry access.
- View enquiries stored in MongoDB.
- Search enquiries using supported search fields.
- Server-side pagination.
- Configurable rows per page.
- Responsive table layout.
- Submission timestamps.

### Backend and Database

- REST API built with Node.js and Express.
- MongoDB persistence using Mongoose.
- Request validation and error handling.
- Environment-based configuration.

## Tech Stack

**Frontend**

- React
- Vite
- Ant Design
- Axios
- React Router

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
Digipeddle Assessment/
├── Frontend/                  # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
├── Backend/
|   |__ modules
|       |__ Enquries              # Express backend
│           ├── models/
│           ├── controllers/
│           ├── routes/
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the application:

- Node.js (a currently supported LTS version)
- npm
- MongoDB locally or a MongoDB Atlas database
- Git

## Installation and Local Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Digipeddle Assessment
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Configure the backend

```bash
cd Backend
npm install
```

Create a `.env` file in the server directory using `.env.example` as a reference.

Configure the environment variables required by your backend, including your MongoDB connection string, port, and admin key.

Example configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ADMIN_KEY=replace_with_a_strong_random_secret
```

These are example variable names. Match them to the names your backend actually reads.

### 3. Start the backend

From the Backend directory, run:

```bash
npm run dev
```

If your backend does not define a `dev` script, use the start command specified in `Backend/package.json`.

The backend is expected to run at:

```text
http://localhost:5000
```

### 4. Configure the frontend

Open a second terminal:

```bash
cd Frontend
npm install
```

Create a frontend `.env` file if your application requires one. Configure the API base URL to point to your local backend.

For example, if your Vite configuration uses this variable:

```env
VITE_API_URL=http://localhost:5000/api
```

Use the variable name expected by your actual Axios client.

### 5. Start the frontend

From the Frontend directory, run:

```bash
npm run dev
```

Open the local URL displayed by Vite. The default is usually:

```text
http://localhost:5173
```

## Application Routes

| Route    | Description                               |
| -------- | ----------------------------------------- |
| `/`      | Public homepage and two-step enquiry form |
| `/admin` | Admin enquiry dashboard                   |

The admin dashboard requires the configured admin key if that is how the backend protects the endpoint.

## API Overview

The following endpoints describe the expected application API. Confirm their exact behavior against the implemented backend routes.

| Method | Endpoint         | Purpose                                    |
| ------ | ---------------- | ------------------------------------------ |
| `POST` | `/api/enquiries` | Submit an enquiry                          |
| `GET`  | `/api/enquiries` | Retrieve enquiries for the admin dashboard |

The GET endpoint supports pagination and search if configured in the backend.

Example request:

```text
GET /api/enquiries?page=1&limit=10&search=Vedant
```

The admin request uses the `x-admin-key` header in the current frontend implementation.

Do not expose the admin key in public frontend source code in a production application. Use proper server-side authentication and authorization for production access.

## Database Collection Structure

The MongoDB enquiry collection stores customer enquiry documents.

| Field         | Type     | Description                 |
| ------------- | -------- | --------------------------- |
| `_id`         | ObjectId | Unique document identifier  |
| `fullName`    | String   | Customer's full name        |
| `email`       | String   | Customer email address      |
| `mobile`      | String   | Customer contact number     |
| `service`     | String   | Requested service           |
| `budget`      | String   | Selected budget range       |
| `description` | String   | Project requirements        |
| `createdAt`   | Date     | Document creation timestamp |
| `updatedAt`   | Date     | Last update timestamp       |

Example document:

```json
{
  "fullName": "Example Customer",
  "email": "customer@example.com",
  "mobile": "+919876543210",
  "service": "Web Development",
  "budget": "Under ₹50,000",
  "description": "I need a responsive business website.",
  "createdAt": "2026-10-29T10:00:00.000Z",
  "updatedAt": "2026-10-29T10:00:00.000Z"
}
```

The actual schema, timestamps, and validation rules are defined by the backend's Mongoose model.

## Validation and Duplicate Submissions

- Frontend validation provides immediate feedback to users.
- Backend validation should independently validate all incoming enquiry data.
- Frontend loading states help prevent accidental repeated clicks.
- If duplicate enquiries must be rejected, enforce the rule on the backend and use an appropriate MongoDB unique index when necessary.

Document the exact duplicate-matching rule implemented by the application.

## Security

- Keep `.env` files out of version control.
- Never commit database credentials, production secrets, or real admin keys.
- Validate incoming requests on the backend.
- Restrict admin endpoints on the server, not just in the frontend.
- Use HTTPS in production.
- Configure production CORS and database access appropriately.

## Testing Checklist

Before submitting or deploying the project, verify:

- [ ] The homepage loads successfully.
- [ ] Both enquiry form steps work.
- [ ] Required-field validation works.
- [ ] Entered information persists when navigating between steps.
- [ ] A valid enquiry is stored in MongoDB.
- [ ] Repeated clicks do not accidentally create duplicate requests.
- [ ] Duplicate enquiries are rejected if this rule is implemented.
- [ ] Admin access is protected.
- [ ] Search returns the expected results.
- [ ] Pagination and page-size selection work.
- [ ] The interface works on desktop, tablet, and mobile.
- [ ] No secrets are included in the Git repository.

## Deployment

The application can be deployed using:

- A frontend hosting platform for the React/Vite application.
- A Node.js-compatible hosting platform for the Express API.
- MongoDB Atlas or another properly secured MongoDB deployment.

Set production environment variables in the hosting provider's configuration. Update the frontend API URL, CORS configuration, and database connection settings for production.

**Live website:** Add your deployed frontend URL here when available.

**GitHub repository:** Add your repository URL here when available.

## License

Add the license appropriate for your project before distributing the source code publicly.
